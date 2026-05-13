// ============================================================
// github-api.js — GitHub Contents API wrapper
// Enterprise edition: retry logic, rate-limit awareness,
// descriptive errors.
// ============================================================

var GitHubAPI = (function () {

  var API_BASE = 'https://api.github.com';

  // ── Constants ──────────────────────────────────────────────
  var MAX_RETRIES   = 2;
  var RETRY_DELAY   = 1000; // ms
  var CONTENT_PATH  = 'progress.json';

  // ── Internal helpers ───────────────────────────────────────

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /**
   * fetchWithRetry — wraps fetch with up to MAX_RETRIES retries
   * on transient network errors (not 4xx).
   */
  async function fetchWithRetry(url, options, attempt) {
    attempt = attempt || 0;
    var res;
    try {
      res = await fetch(url, options);
    } catch (networkErr) {
      // Pure network failure (offline, DNS, etc.)
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY);
        return fetchWithRetry(url, options, attempt + 1);
      }
      throw new Error(
        'Network error — check your internet connection. ' +
        '(' + networkErr.message + ')'
      );
    }

    // Rate-limit errors — do not retry, surface immediately
    if (res.status === 403 || res.status === 429) {
      var rateLimitReset = res.headers.get('X-RateLimit-Reset');
      var resetInfo = '';
      if (rateLimitReset) {
        var resetDate = new Date(parseInt(rateLimitReset, 10) * 1000);
        resetInfo = ' Resets at ' + resetDate.toLocaleTimeString() + '.';
      }
      throw new Error(
        'GitHub API rate limit exceeded.' + resetInfo +
        ' Wait a moment before syncing again.'
      );
    }

    // Server errors (5xx) are retryable
    if (res.status >= 500 && attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY);
      return fetchWithRetry(url, options, attempt + 1);
    }

    return res;
  }

  function buildHeaders(pat) {
    return {
      Authorization: 'token ' + pat,
      Accept: 'application/vnd.github.v3+json',
    };
  }

  /**
   * loadProgress — GET /repos/{owner}/{repo}/contents/progress.json
   * Returns { data: Object, sha: string } or { data: null, sha: null }
   */
  async function loadProgress(owner, repo, pat) {
    var url = API_BASE + '/repos/' + owner + '/' + repo + '/contents/' + CONTENT_PATH;
    var res = await fetchWithRetry(url, { headers: buildHeaders(pat) });

    if (res.status === 404) {
      return { data: null, sha: null };
    }

    if (res.status === 401) {
      throw new Error(
        'Authentication failed — your Personal Access Token is invalid or expired. ' +
        'Generate a new PAT at github.com/settings/tokens.'
      );
    }

    if (!res.ok) {
      var err = await res.json().catch(function () { return {}; });
      throw new Error(
        err.message ||
        'GitHub API returned status ' + res.status + ' for ' + owner + '/' + repo + '.'
      );
    }

    var file    = await res.json();
    var decoded = atob(file.content.replace(/\n/g, ''));
    var data    = JSON.parse(decoded);
    return { data: data, sha: file.sha };
  }

  /**
   * saveProgress — PUT /repos/{owner}/{repo}/contents/progress.json
   * sha is null when creating the file for the first time.
   * Returns the new SHA string.
   */
  async function saveProgress(owner, repo, pat, data, sha, message) {
    var url     = API_BASE + '/repos/' + owner + '/' + repo + '/contents/' + CONTENT_PATH;
    var content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

    var body = {
      message: message || 'chore: update progress.json',
      content: content,
    };
    if (sha) body.sha = sha;

    var res = await fetchWithRetry(url, {
      method: 'PUT',
      headers: Object.assign(buildHeaders(pat), { 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    });

    if (res.status === 401) {
      throw new Error(
        'Authentication failed — your PAT may not have "repo" write permissions. ' +
        'Edit permissions at github.com/settings/tokens.'
      );
    }

    if (res.status === 409) {
      throw new Error(
        'Sync conflict — the file was modified elsewhere. ' +
        'Refresh the page to load the latest version, then sync again.'
      );
    }

    if (!res.ok) {
      var errBody = await res.json().catch(function () { return {}; });
      throw new Error(
        errBody.message ||
        'Failed to save to GitHub (status ' + res.status + ').'
      );
    }

    var result = await res.json();
    return result.content.sha;
  }

  // ── Public API ─────────────────────────────────────────────
  return {
    loadProgress: loadProgress,
    saveProgress: saveProgress,
  };

}());

// Expose as global functions for backward-compat with app.js call sites
function loadProgress(owner, repo, pat) {
  return GitHubAPI.loadProgress(owner, repo, pat);
}
function saveProgress(owner, repo, pat, data, sha, message) {
  return GitHubAPI.saveProgress(owner, repo, pat, data, sha, message);
}

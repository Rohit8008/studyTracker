// ============================================================
// github-api.js — GitHub Contents API wrapper
// ============================================================

const GITHUB_API = 'https://api.github.com';

/**
 * loadProgress — GET /repos/{owner}/{repo}/contents/progress.json
 * Returns { data: Object, sha: string } or { data: null, sha: null } if not found
 */
async function loadProgress(owner, repo, pat) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/progress.json`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${pat}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (res.status === 404) {
    return { data: null, sha: null };
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API error ${res.status}`);
  }

  const file = await res.json();
  const decoded = atob(file.content.replace(/\n/g, ''));
  const data = JSON.parse(decoded);
  return { data, sha: file.sha };
}

/**
 * saveProgress — PUT /repos/{owner}/{repo}/contents/progress.json
 * sha is undefined/null when creating the file for the first time.
 */
async function saveProgress(owner, repo, pat, data, sha) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/progress.json`;
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

  const body = {
    message: 'chore: update progress.json',
    content,
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${pat}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API error ${res.status}`);
  }

  const result = await res.json();
  return result.content.sha; // return new SHA for subsequent saves
}

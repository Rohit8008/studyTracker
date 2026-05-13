// ============================================================
// markdown.js — lightweight markdown → HTML renderer
// Supports: headings, bold, italic, inline code, code blocks,
//           unordered/ordered lists, blockquotes, hr, line breaks
// ============================================================

function renderMarkdown(text) {
  if (!text) return '';

  let html = text
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Fenced code blocks ```lang\n...\n```
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const cls = lang ? ` class="lang-${lang}"` : '';
    return `<pre><code${cls}>${code.trim()}</code></pre>`;
  });

  // Blockquotes (lines starting with >)
  html = html.replace(/(^|\n)((&gt; ?.*\n?)+)/g, (_, pre, block) => {
    const inner = block.replace(/^&gt; ?/gm, '').trim();
    return `${pre}<blockquote>${inner}</blockquote>`;
  });

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm,  '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm,   '<h1>$1</h1>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr>');

  // Unordered lists — group consecutive lines starting with - or *
  html = html.replace(/((?:^[-*] .+\n?)+)/gm, block => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^[-*] /, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, block => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });

  // Inline: bold, italic, inline code
  html = html.replace(/\*\*(.+?)\*\*/g,  '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g,      '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g,      '<code>$1</code>');

  // Paragraphs — blank lines become paragraph breaks
  html = html
    .split(/\n{2,}/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      // Don't wrap block-level elements in <p>
      if (/^<(h[1-3]|ul|ol|pre|blockquote|hr)/.test(block)) return block;
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');

  return html;
}

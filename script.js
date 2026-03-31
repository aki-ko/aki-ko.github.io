/* ============================================================
   AKI WEBZINE — script.js
   ============================================================ */

'use strict';

/* ── 1. SEARCH TOGGLE ── */
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input   = document.getElementById('searchInput');
  if (!overlay) return;
  overlay.classList.toggle('active');
  if (overlay.classList.contains('active')) {
    input.focus();
  }
}

function handleSearch(event) {
  if (event.key === 'Enter') {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
      window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
  }
  if (event.key === 'Escape') {
    toggleSearch();
  }
}

/* ── 2. TAG CLOUD LOADER ── */
async function loadTags() {
  const tagCloud = document.getElementById('tagCloud');
  if (!tagCloud) return;

  try {
    const res  = await fetch('data/tags.json');
    const data = await res.json();

    tagCloud.innerHTML = '';
    data.tags.forEach(tag => {
      const a = document.createElement('a');
      a.href      = `tag.html?tag=${encodeURIComponent(tag.name)}`;
      a.className = 'tag tag--lg';
      a.textContent = tag.name;
      if (tag.count) a.setAttribute('data-count', tag.count);
      tagCloud.appendChild(a);
    });
  } catch (err) {
    // tags.json 없으면 정적 태그 유지
    console.log('tags.json not found, using static tags.');
  }
}

/* ── 3. ARTICLE LIST LOADER (from JSON index) ── */
async function loadArticles() {
  const list = document.getElementById('articleList');
  if (!list) return;

  try {
    const res      = await fetch('data/articles.json');
    const articles = await res.json();

    // 최신 5개만 Latest에 표시
    const latest = articles.slice(0, 5);

    list.innerHTML = '';
    latest.forEach((article, i) => {
      const li = document.createElement('li');
      li.className = 'article-list-item';
      li.innerHTML = `
        <div class="ali-left">
          <span class="ali-num">${String(i + 1).padStart(2, '0')}</span>
          <div class="ali-info">
            <span class="ali-category">${article.category || ''}</span>
            <a href="articles/${article.slug}.html" class="ali-title">${article.title}</a>
          </div>
        </div>
        <div class="ali-right">
          <div class="ali-tags">
            ${(article.tags || []).slice(0, 1).map(t =>
              `<a href="tag.html?tag=${encodeURIComponent(t)}" class="tag tag--small">${t}</a>`
            ).join('')}
          </div>
          <span class="ali-date">${article.date ? article.date.slice(0, 7) : ''}</span>
        </div>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    // articles.json 없으면 정적 리스트 유지
    console.log('articles.json not found, using static list.');
  }
}

/* ── 4. SEARCH PAGE ── */
async function initSearchPage() {
  const params = new URLSearchParams(window.location.search);
  const query  = params.get('q');
  if (!query) return;

  const titleEl = document.getElementById('searchQuery');
  const countEl = document.getElementById('searchCount');
  const listEl  = document.getElementById('searchResults');
  if (titleEl) titleEl.textContent = `"${query}"`;

  try {
    const res      = await fetch('data/articles.json');
    const articles = await res.json();

    const q       = query.toLowerCase();
    const results = articles.filter(a =>
      (a.title  && a.title.toLowerCase().includes(q))  ||
      (a.summary && a.summary.toLowerCase().includes(q)) ||
      (a.tags   && a.tags.some(t => t.toLowerCase().includes(q)))  ||
      (a.category && a.category.toLowerCase().includes(q))
    );

    if (countEl) countEl.textContent = `${results.length}개의 결과`;

    if (listEl) {
      listEl.innerHTML = '';
      if (results.length === 0) {
        listEl.innerHTML = '<p style="font-family:var(--font-mono);font-size:0.8rem;color:var(--charcoal-mute);">검색 결과가 없습니다.</p>';
        return;
      }
      results.forEach(article => {
        const li = document.createElement('li');
        li.className = 'article-list-item';
        li.innerHTML = `
          <div class="ali-left">
            <div class="ali-info">
              <span class="ali-category">${article.category || ''}</span>
              <a href="articles/${article.slug}.html" class="ali-title">${article.title}</a>
            </div>
          </div>
          <div class="ali-right">
            <span class="ali-date">${article.date ? article.date.slice(0, 7) : ''}</span>
          </div>
        `;
        listEl.appendChild(li);
      });
    }
  } catch (err) {
    console.log('Search failed:', err);
  }
}

/* ── 5. TAG PAGE ── */
async function initTagPage() {
  const params  = new URLSearchParams(window.location.search);
  const tag     = params.get('tag');
  if (!tag) return;

  const titleEl = document.getElementById('tagName');
  const listEl  = document.getElementById('tagResults');
  if (titleEl) titleEl.textContent = `#${tag}`;

  try {
    const res      = await fetch('data/articles.json');
    const articles = await res.json();

    const results = articles.filter(a =>
      a.tags && a.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    );

    if (listEl) {
      listEl.innerHTML = '';
      results.forEach(article => {
        const li = document.createElement('li');
        li.className = 'article-list-item';
        li.innerHTML = `
          <div class="ali-left">
            <div class="ali-info">
              <span class="ali-category">${article.category || ''}</span>
              <a href="articles/${article.slug}.html" class="ali-title">${article.title}</a>
            </div>
          </div>
          <div class="ali-right">
            <span class="ali-date">${article.date ? article.date.slice(0, 7) : ''}</span>
          </div>
        `;
        listEl.appendChild(li);
      });
    }
  } catch (err) {
    console.log('Tag filter failed:', err);
  }
}

/* ── 6. FADE-IN ON SCROLL ── */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.article-card, .article-list-item, .person-card, .archive-item, .prompt-block'
  );
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
}

/* ── 7. MARKDOWN → HTML (simple converter for static use) ── */
/**
 * GitHub Pages에서 Markdown을 HTML로 변환하려면
 * Jekyll을 사용하는 것이 표준입니다.
 * 아래는 Jekyll 없이 순수 JS로 md를 렌더링하는 최소 구현입니다.
 * 실제 사용 시 jekyll 빌드 또는 marked.js 라이브러리 사용을 권장합니다.
 */
async function loadMarkdownArticle() {
  const bodyEl = document.getElementById('articleBody');
  if (!bodyEl) return;

  const slug = bodyEl.getAttribute('data-slug');
  if (!slug) return;

  try {
    const res  = await fetch(`articles/${slug}.md`);
    const text = await res.text();
    bodyEl.innerHTML = simpleMarkdown(text);
  } catch (err) {
    console.log('Markdown load failed:', err);
  }
}

function simpleMarkdown(md) {
  // Front matter 제거
  const body = md.replace(/^---[\s\S]*?---\n/, '');
  return body
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^\> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|b|p|hr])(.+)$/gm, '<p>$1</p>');
}

/* ── 8. RELATED ARTICLES ── */
async function loadRelatedArticles() {
  const container = document.getElementById('relatedArticles');
  if (!container) return;

  const currentTags = (container.getAttribute('data-tags') || '').split(',').map(t => t.trim());
  const currentSlug = container.getAttribute('data-slug');

  try {
    const res      = await fetch('/data/articles.json');
    const articles = await res.json();

    const related = articles
      .filter(a => a.slug !== currentSlug)
      .filter(a => a.tags && a.tags.some(t => currentTags.includes(t)))
      .slice(0, 3);

    container.innerHTML = '';
    related.forEach(article => {
      const card = document.createElement('article');
      card.className = 'article-card';
      card.innerHTML = `
        <div class="card-body">
          <div class="card-meta">
            <span class="card-category">${article.category || ''}</span>
            <span class="card-date">${article.date || ''}</span>
          </div>
          <h3 class="card-title">
            <a href="/articles/${article.slug}.html">${article.title}</a>
          </h3>
          <p class="card-summary">${article.summary || ''}</p>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.log('Related articles load failed:', err);
  }
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');

  loadTags();
  loadArticles();
  initScrollReveal();
  loadMarkdownArticle();
  loadRelatedArticles();

  if (page === 'search') initSearchPage();
  if (page === 'tag')    initTagPage();
});

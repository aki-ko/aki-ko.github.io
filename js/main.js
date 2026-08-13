const DATA_URL = "data/site-data.json";

const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

async function loadData() {
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error(`Failed to load ${DATA_URL}`);
  return response.json();
}

function renderProfile(profile) {
  document.getElementById("hero-name").textContent = profile.name;
  document.getElementById("hero-location").textContent = profile.location;
  document.getElementById("hero-headline").textContent = profile.headline;
  document.getElementById("hero-bio").textContent = profile.bio;
  document.getElementById("profile-bio").textContent = profile.bio;
  document.getElementById("profile-fields").innerHTML = profile.fields.map(v => `<span class="tag">${esc(v)}</span>`).join("");
  const email = document.getElementById("contact-email");
  email.href = `mailto:${profile.contact.email}`;
  email.textContent = profile.contact.email;
}

function renderEducation(items) {
  document.getElementById("education-list").innerHTML = items.map(item => `
    <article class="index-row">
      <div class="meta">${esc(item.period)}</div>
      <div class="title">${esc(item.institution)}</div>
      <div class="meta">${esc(item.program)}</div>
      <div>${esc(item.description)}</div>
    </article>`).join("");
}

function renderCareer(items) {
  document.getElementById("career-list").innerHTML = items.map(item => `
    <article class="career-item">
      <div class="career-period">${esc(item.period)}</div>
      <div class="career-title"><h3>${esc(item.company)}</h3><p>${esc(item.role)}</p></div>
      <div class="career-content"><p>${esc(item.summary)}</p><ul>${(item.responsibilities || []).map(v => `<li>${esc(v)}</li>`).join("")}</ul></div>
    </article>`).join("");
}

function renderExperience(items) {
  document.getElementById("experience-list").innerHTML = items.map(item => `
    <article class="index-row">
      <div class="meta">${esc(item.period)}</div>
      <div class="title">${esc(item.title)}</div>
      <div class="meta">${esc(item.role)}</div>
      <div>${esc(item.description)}</div>
    </article>`).join("");
}

function projectCard(item) {
  const categories = item.category || [];
  return `<article class="project-card" data-categories="${esc(categories.join("|").toLowerCase())}">
    <div class="card-meta"><span>${esc(item.year)}</span><span>${esc(item.organization || "")}</span></div>
    <div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="card-tags">${categories.map(v => `<span>${esc(v)}</span>`).join("")}</div></div>
  </article>`;
}

function renderProjects(items) {
  const list = document.getElementById("projects-list");
  list.innerHTML = items.map(projectCard).join("");
  const categories = [...new Set(items.flatMap(item => item.category || []))].sort();
  const filters = document.getElementById("project-filters");
  filters.innerHTML = ['All', ...categories].map((cat, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${esc(cat.toLowerCase())}">${esc(cat)}</button>`).join("");
  filters.addEventListener("click", event => {
    const btn = event.target.closest(".filter-btn"); if (!btn) return;
    filters.querySelectorAll(".filter-btn").forEach(el => el.classList.remove("active")); btn.classList.add("active");
    const value = btn.dataset.filter;
    list.querySelectorAll(".project-card").forEach(card => { card.hidden = value !== "all" && !card.dataset.categories.includes(value); });
  });
}

function renderArt(items) {
  document.getElementById("art-list").innerHTML = items.map(item => projectCard({...item, category:[item.type,item.medium].filter(Boolean), organization:"Art Practice"})).join("");
}

function renderWriting(items) {
  document.getElementById("writing-list").innerHTML = items.map(item => `
    <article class="index-row"><div class="meta">${esc(item.platform)}</div><div class="title"><a href="${esc(item.url)}" target="_blank" rel="noreferrer">${esc(item.title)}</a></div><div class="meta">Essay</div><div>${esc(item.description)}</div></article>`).join("");
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle"), nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
  nav.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
}

async function init() {
  initMenu(); document.getElementById("footer-year").textContent = new Date().getFullYear();
  try { const data = await loadData(); renderProfile(data.profile); renderEducation(data.education); renderCareer(data.career); renderExperience(data.experience); renderProjects(data.projects); renderArt(data.art); renderWriting(data.writing); }
  catch (error) { console.error(error); }
}
init();

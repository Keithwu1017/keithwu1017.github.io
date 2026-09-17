const root = document.documentElement;
const themeButton = document.querySelector("#theme-button");
const themeIcon = themeButton.querySelector("span");
let savedTheme;
try { savedTheme = localStorage.getItem("profile-theme"); } catch {}
const tabs = [...document.querySelectorAll(".preview-tab")];
const panels = [...document.querySelectorAll(".preview-panel")];

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === "light";
  themeButton.setAttribute("aria-pressed", String(isLight));
  themeIcon.textContent = isLight ? "☾" : "☀";
}

function showPreview(name) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.preview === name;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });
  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === name;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

applyTheme(savedTheme === "light" ? "light" : "dark");
themeButton.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
  try { localStorage.setItem("profile-theme", nextTheme); } catch {}
});

tabs.forEach((tab, index) => {
  tab.addEventListener("mouseenter", () => showPreview(tab.dataset.preview));
  tab.addEventListener("focus", () => showPreview(tab.dataset.preview));
  tab.addEventListener("click", () => showPreview(tab.dataset.preview));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
    showPreview(nextTab.dataset.preview);
    nextTab.focus();
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

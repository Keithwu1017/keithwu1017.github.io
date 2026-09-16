const root = document.documentElement;
const themeButton = document.querySelector("#theme-button");
const themeIcon = themeButton.querySelector("span");
const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === "light";
  themeButton.setAttribute("aria-pressed", String(isLight));
  themeIcon.textContent = isLight ? "☾" : "☀";
}

applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

themeButton.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

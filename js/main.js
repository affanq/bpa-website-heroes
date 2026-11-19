// Shared, intentionally small JavaScript for the starter website.
document.addEventListener("DOMContentLoaded", () => {
  // Load the optional theme overrides on every page that uses this shared script.
  const themeStylesheet = document.createElement("link");
  themeStylesheet.rel = "stylesheet";
  themeStylesheet.href = "css/themes.css";
  document.head.append(themeStylesheet);

  const themes = [
    { value: "evergreen", label: "Evergreen" },
    { value: "ocean", label: "Ocean" },
    { value: "citrus", label: "Citrus" },
    { value: "twilight", label: "Twilight" }
  ];
  const themePicker = document.createElement("label");
  themePicker.className = "theme-picker";
  themePicker.append(document.createTextNode("Theme"));

  const themeSelect = document.createElement("select");
  themeSelect.id = "theme-select";
  themeSelect.setAttribute("aria-label", "Choose a color theme");
  themes.forEach(({ value, label }) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    themeSelect.append(option);
  });
  themePicker.append(themeSelect);

  const header = document.querySelector(".nav-wrap");
  const nav = document.querySelector("#primary-nav");
  if (header && nav) header.insertBefore(themePicker, nav.nextSibling);

  let savedTheme = "evergreen";
  try {
    const storedTheme = window.localStorage.getItem("everyday-impact-theme");
    if (themes.some(({ value }) => value === storedTheme)) savedTheme = storedTheme;
  } catch {
    // The selector still works for this page when browser storage is unavailable.
  }

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeSelect.value = theme;
  };
  applyTheme(savedTheme);
  themeSelect.addEventListener("change", () => {
    applyTheme(themeSelect.value);
    try {
      window.localStorage.setItem("everyday-impact-theme", themeSelect.value);
    } catch {
      // Keep the selected theme for this page even if it cannot be persisted.
    }
  });

  const menuButton = document.querySelector(".menu-toggle");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Demo-only form: it validates and displays a local preview; it sends nothing.
  const form = document.querySelector("#nomination-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.querySelector("#nominee").value.trim();
      const message = document.querySelector("#form-message");
      message.textContent = name
        ? `Demo preview: nomination for ${name} is complete. No information was sent or saved.`
        : "Please enter a name.";
    });
  }
});

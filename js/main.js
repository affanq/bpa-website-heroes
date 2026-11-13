// Shared, intentionally small JavaScript for the starter website.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

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

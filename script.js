
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = [...document.querySelectorAll(".nav-link")];

// Restore the previously selected theme.
try {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    root.dataset.theme = savedTheme;
  }
} catch (error) {
  // The website still works if browser storage is unavailable.
}

// Update the theme button icon and accessibility label.
function updateThemeButton() {
  const dark = root.dataset.theme === "dark";

  themeToggle.textContent = dark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    dark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
}

// Toggle dark and light themes.
themeToggle.addEventListener("click", () => {
  const nextTheme =
    root.dataset.theme === "dark" ? "light" : "dark";

  root.dataset.theme = nextTheme;

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    // Ignore storage errors.
  }

  updateThemeButton();
});

updateThemeButton();

// Close the mobile navigation.
function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

// Open and close the mobile menu.
menuToggle.addEventListener("click", () => {
  const isOpen =
    menuToggle.getAttribute("aria-expanded") === "true";

  mainNav.classList.toggle("open", !isOpen);

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation"
  );
});

// Close the menu after selecting a navigation link.
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu when clicking outside it.
document.addEventListener("click", (event) => {
  if (
    !mainNav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

// Highlight the navigation link for the visible section.
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const active =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", active);
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// Contact form: prepare an email in the visitor's email application.
// Replace this address with your own email before publishing.
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const emailAddress = "hello@utamdevi.dev";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formNote.textContent =
      "Please complete all fields before continuing.";
    return;
  }

  const subject = encodeURIComponent(
    `Portfolio enquiry from ${name}`
  );

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`
  );

  formNote.textContent = "Opening your email app…";

  window.location.href =
    `mailto:${emailAddress}?subject=${subject}&body=${body}`;
});

// Automatically update the copyright year.
document.getElementById("year").textContent =
  new Date().getFullYear();

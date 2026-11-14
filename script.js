const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

function updateActiveLink() {
    const sections = document.querySelectorAll("main section[id]");
    let currentSection = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    themeIcon.textContent = theme === "dark" ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
}

const savedTheme = localStorage.getItem("tryx-theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-mode")
        ? "light"
        : "dark";

    localStorage.setItem("tryx-theme", newTheme);
    applyTheme(newTheme);
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 450);
    updateActiveLink();
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

updateActiveLink();

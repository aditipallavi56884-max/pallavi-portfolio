/* ==========================================
   PALLAVI — PORTFOLIO INTERACTIONS
========================================== */


/* 1. AUTOMATIC COPYRIGHT YEAR */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* 2. MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navigationLinks = document.querySelectorAll(".nav-links a");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

}


/* Close mobile menu after clicking a navigation link */

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navLinks && menuToggle) {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        }

    });

});


/* 3. ACTIVE NAVIGATION HIGHLIGHT */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationLinks.forEach((link) => {

                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* 4. SCROLL-REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".skill-card, " +
    ".project-card, " +
    ".future-project, " +
    ".contact-box"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

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
        element.classList.add("visible");
    });

}


/* 5. BUTTON FEEDBACK */

const interactiveButtons = document.querySelectorAll(
    ".button, .nav-button"
);

interactiveButtons.forEach((button) => {

    button.addEventListener("click", () => {

        button.classList.add("clicked");

        window.setTimeout(() => {
            button.classList.remove("clicked");
        }, 180);

    });

});


/* 6. UPDATE NAVIGATION ON PAGE LOAD */

function updateNavigation() {

    const currentHash = window.location.hash || "#home";

    navigationLinks.forEach((link) => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === currentHash
        );

    });

}

window.addEventListener("hashchange", updateNavigation);

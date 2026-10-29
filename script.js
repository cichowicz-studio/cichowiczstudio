
history.scrollRestoration = "manual";

// ====================
// START STRONY
// ====================

function goToStart() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
}

window.addEventListener("load", () => {
    goToStart();

    if (window.location.hash) {
        history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );
    }

    setTimeout(goToStart, 100);
    setTimeout(goToStart, 300);
});

window.addEventListener("pageshow", () => {
    goToStart();
    setTimeout(goToStart, 100);
});

// ====================
// DYNAMICZNA NAWIGACJA
// ====================

const navbar = document.querySelector(".navbar");

function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );
}

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();

// ====================
// ANIMACJE PRZY SCROLLU
// ====================

const revealTargets = document.querySelectorAll(`
    .about h2,
    .about > p,
    .about-note,
    .offer h2,
    .offer .section-intro,
    .offer-item,
    .offer-bottom,
    .process h2,
    .process .section-intro,
    .process-item,
    .process-note,
    .contact
`);

revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay =
        `${(index % 4) * 100}ms`;
});

const elements = document.querySelectorAll(
    ".about, .offer, .offer-item, .contact, .reveal"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    }
);

elements.forEach((element) => {
    observer.observe(element);
});

history.scrollRestoration = "manual";

// Przy wejściu/odświeżeniu strony zawsze zaczynamy od START
window.addEventListener("load", () => {
    if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
    }

    window.scrollTo(0, 0);
});


// ====================
// ANIMACJE PRZY SCROLLU
// ====================

const elements = document.querySelectorAll(
    ".about, .offer, .offer-item, .contact"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });
    },
    {
        threshold: 0.15
    }
);

elements.forEach((element) => {
    observer.observe(element);
});
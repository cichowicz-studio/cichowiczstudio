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


// Przy wejściu na stronę
window.addEventListener("load", () => {

    goToStart();

    if (window.location.hash) {
        history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );
    }

    setTimeout(() => {
        goToStart();
    }, 100);

    setTimeout(() => {
        goToStart();
    }, 300);
});


// Zabezpieczenie dla telefonów
window.addEventListener("pageshow", () => {

    goToStart();

    setTimeout(() => {
        goToStart();
    }, 100);

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
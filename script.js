history.scrollRestoration = "manual";


// ====================
// START STRONY
// ====================

function goToStart() {
    window.scrollTo(0, 0);
}


// Przy każdym wejściu na stronę
window.addEventListener("load", () => {

    // Usuwamy zapamiętaną kotwicę z adresu
    if (window.location.hash) {
        history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );
    }

    // Wracamy na samą górę
    goToStart();

    // Drugi raz po krótkiej chwili — pomaga na telefonach
    setTimeout(() => {
        goToStart();
    }, 100);
});


// Dodatkowe zabezpieczenie dla mobilnych przeglądarek
window.addEventListener("pageshow", () => {
    setTimeout(() => {
        goToStart();
    }, 50);
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
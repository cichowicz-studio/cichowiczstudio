
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
// ====================
// ZGODA NA COOKIES I GA4
// ====================

const GA_MEASUREMENT_ID = "G-554EK4HGWP";
const CONSENT_STORAGE_KEY = "cichowicz_analytics_consent";

const cookieBanner = document.getElementById("cookieBanner");
const cookieOverlay = document.getElementById("cookieOverlay");
const acceptAnalyticsButton = document.getElementById("acceptAnalytics");
const rejectAnalyticsButton = document.getElementById("rejectAnalytics");
const cookieSettingsButton = document.getElementById("cookieSettings");

function getAnalyticsConsent() {
    try {
        return localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch (error) {
        return null;
    }
}

function saveAnalyticsConsent(value) {
    try {
        localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch (error) {
        console.warn("Nie udało się zapisać ustawień cookies.");
    }
}

function showCookieBanner() {
    if (cookieBanner) {
        cookieBanner.classList.add("is-visible");
    }

    if (cookieOverlay) {
        cookieOverlay.classList.add("is-visible");
    }

    document.body.classList.add("cookie-locked");
}

function hideCookieBanner() {
    if (cookieBanner) {
        cookieBanner.classList.remove("is-visible");
    }

    if (cookieOverlay) {
        cookieOverlay.classList.remove("is-visible");
    }

    document.body.classList.remove("cookie-locked");
}
function loadGoogleAnalytics() {
    if (window.cichowiczAnalyticsLoaded) return;

    window.cichowiczAnalyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);

    const analyticsScript = document.createElement("script");

    analyticsScript.async = true;
    analyticsScript.src =
        "https://www.googletagmanager.com/gtag/js?id=" +
        GA_MEASUREMENT_ID;

    document.head.appendChild(analyticsScript);
}

function acceptAnalytics() {
    saveAnalyticsConsent("accepted");

    hideCookieBanner();

    if (cookieSettingsButton) {
        cookieSettingsButton.classList.add("is-visible");
    }

    loadGoogleAnalytics();
}

function rejectAnalytics() {
    const analyticsWasLoaded = window.cichowiczAnalyticsLoaded;

    saveAnalyticsConsent("rejected");

    hideCookieBanner();

    if (cookieSettingsButton) {
        cookieSettingsButton.classList.add("is-visible");
    }

    // Po wcześniejszej zgodzie odświeżamy stronę,
    // aby uruchomiła się już bez Google Analytics.
    if (analyticsWasLoaded) {
        window.location.reload();
    }
}

if (acceptAnalyticsButton) {
    acceptAnalyticsButton.addEventListener("click", acceptAnalytics);
}

if (rejectAnalyticsButton) {
    rejectAnalyticsButton.addEventListener("click", rejectAnalytics);
}

if (cookieSettingsButton) {
    cookieSettingsButton.addEventListener("click", showCookieBanner);
}

// Odczyt wcześniejszej decyzji użytkownika

const savedConsent = getAnalyticsConsent();

if (savedConsent === "accepted") {
    loadGoogleAnalytics();
}

showCookieBanner();

if (cookieSettingsButton) {
    cookieSettingsButton.classList.add("is-visible");
}
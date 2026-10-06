window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


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
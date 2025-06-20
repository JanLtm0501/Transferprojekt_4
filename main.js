// main.js – globale JS-Funktionen für die Seite

document.addEventListener("DOMContentLoaded", () => {
    // Burger-Menü für Mobilgeräte
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav-links");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
            burger.classList.toggle("open");
        });

        // Navigation automatisch schließen, wenn Link geklickt wird (auf Mobil)
        nav.querySelectorAll("a").forEach(link =>
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                burger.classList.remove("open");
            })
        );
    }

    // Optional: Sticky Navigation oder andere globale Logik
});

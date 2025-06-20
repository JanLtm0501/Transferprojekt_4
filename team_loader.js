document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("allePositionen");
    if (!container || typeof TEAM_KEY === "undefined") return;

    const spieler = JSON.parse(localStorage.getItem(TEAM_KEY)) || [];

    if (spieler.length === 0) {
        container.innerHTML = "<p>Keine Spieler vorhanden.</p>";
        return;
    }

    // Spieler nach Positionen gruppieren
    const gruppiert = {};
    spieler.forEach(s => {
        const key = s.position?.trim() || "Unbekannt";
        if (!gruppiert[key]) gruppiert[key] = [];
        gruppiert[key].push(s);
    });

    // Diese Reihenfolge soll verwendet werden
    const sortiertePositionen = ["Trainer", "Torwart", "Abwehr", "Mittelfeld", "Stürmer"];

    // Zuerst die bekannten Positionen anzeigen
    sortiertePositionen.forEach(position => {
        if (gruppiert[position]) {
            // innerhalb der Position alphabetisch sortieren
            const sortiert = gruppiert[position].sort((a, b) => a.name.localeCompare(b.name));
            renderPosition(position, sortiert, container);
            delete gruppiert[position]; // schon verarbeitet
        }
    });

    // Danach alle restlichen Positionen alphabetisch (Position + Spielername)
    Object.keys(gruppiert)
        .sort()
        .forEach(rest => {
            const sortiert = gruppiert[rest].sort((a, b) => a.name.localeCompare(b.name));
            renderPosition(rest, sortiert, container);
        });
});

function renderPosition(position, spielerArray, container) {
    const abschnitt = document.createElement("div");
    abschnitt.className = "player-category";

    const heading = document.createElement("h2");
    heading.textContent = formatierePosition(position);
    abschnitt.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "player-grid";

    spielerArray.forEach(s => {
        const card = document.createElement("div");
        card.className = "player-card";
        card.innerHTML = `
        <img src="${s.foto || 'img/spieler/platzhalter.jpg'}" alt="${s.name}">
        <p><strong>${s.name}</strong><br>${formatierePosition(s.position)}</p>
      `;
        grid.appendChild(card);
    });

    abschnitt.appendChild(grid);
    container.appendChild(abschnitt);
}

function formatierePosition(pos) {
    if (!pos) return "Unbekannt";
    return pos.charAt(0).toUpperCase() + pos.slice(1);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const spielerListe = document.querySelector(".spieler-liste ul");
    const teamKey = TEAM_KEY || "spieler_default";

    let spieler = JSON.parse(localStorage.getItem(teamKey)) || [];

    renderSpieler();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const position = document.getElementById("position").value.trim();
        const foto = document.getElementById("foto").value.trim();

        if (!name || !position) {
            alert("Bitte Name und Position angeben.");
            return;
        }

        spieler.push({ name, position, foto });
        localStorage.setItem(teamKey, JSON.stringify(spieler));

        form.reset();
        renderSpieler();
    });

    function renderSpieler() {
        // Sortiert zuerst nach Position und innerhalb alphabetisch nach Name
        spielerListe.innerHTML = "";

        const gruppiert = {};
        spieler.forEach(s => {
            const key = s.position?.trim() || "Unbekannt";
            if (!gruppiert[key]) gruppiert[key] = [];
            gruppiert[key].push(s);
        });

        const sortiertePositionen = ["Trainer", "Torwart", "Abwehr", "Mittelfeld", "Stürmer"];

        sortiertePositionen.forEach(pos => {
            if (gruppiert[pos]) {
                gruppiert[pos].sort((a, b) => a.name.localeCompare(b.name));
                gruppiert[pos].forEach(renderEintrag);
                delete gruppiert[pos];
            }
        });

        Object.keys(gruppiert)
            .sort()
            .forEach(pos => {
                gruppiert[pos].sort((a, b) => a.name.localeCompare(b.name));
                gruppiert[pos].forEach(renderEintrag);
            });
    }

    function renderEintrag(s, index) {
        const li = document.createElement("li");
        li.innerHTML = `
        <strong>${s.name}</strong> – ${s.position}
        <button class="delete-btn" data-index="${index}">Löschen</button>
      `;
        spielerListe.appendChild(li);
    }

    spielerListe.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = Array.from(spielerListe.children).indexOf(e.target.closest("li"));
            if (index > -1) {
                spieler.splice(index, 1);
                localStorage.setItem(teamKey, JSON.stringify(spieler));
                renderSpieler();
            }
        }
    });
});

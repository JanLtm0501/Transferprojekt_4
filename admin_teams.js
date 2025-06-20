/* admin_teams.js  –  Version 20 Jun 2025  */

/* =========================================
   Konstanten & Hilfsfunktionen
========================================= */

const POS_ORDER = ["Trainer", "Torwart", "Abwehr", "Mittelfeld", "Stürmer"];

/**
 * Liefert den Local-Storage-Key für ein Team.
 * Beispiel:  ("senioren", "3_Herren")  ->  "spieler_senioren_3_Herren"
 */
function teamKey(kategorie, team) {
    return `spieler_${kategorie}_${team}`; // eindeutig & lesbar
}

function loadPlayers(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
        console.error("Fehler beim Laden:", e);
        return [];
    }
}

function savePlayers(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}

function sortByPos(arr) {
    return arr.slice().sort((a, b) => {
        const idxA = POS_ORDER.indexOf(a.position);
        const idxB = POS_ORDER.indexOf(b.position);
        if (idxA === idxB) return a.name.localeCompare(b.name, "de");
        if (idxA === -1 && idxB === -1) return a.position.localeCompare(b.position, "de");
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
    });
}

function capitalize(str = "") {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* =========================================
   DOM-Elemente
========================================= */

const categorySel = document.getElementById("categorySelect");
const teamSel = document.getElementById("teamSelect");
const form = document.getElementById("spielerForm");
const nameInput = document.getElementById("spielerName");
const posInput = document.getElementById("position");
const fotoInput = document.getElementById("fotoURL");
const listNode = document.querySelector(".spieler-liste");

/* =========================================
   Datenquelle & aktueller Status
========================================= */

let currentCategory = "";
let currentTeam = "";

/* =========================================
   Rendering
========================================= */

function renderList(data) {
    listNode.innerHTML = "";
    if (data.length === 0) {
        listNode.innerHTML = "<p>Keine Spieler vorhanden.</p>";
        return;
    }

    const sortiert = sortByPos(data);

    sortiert.forEach(p => {
        const li = document.createElement("li");
        li.dataset.id = p.id;

        li.innerHTML = `
      <strong>${p.name}</strong>
      &nbsp;–&nbsp;${capitalize(p.position || "unbekannt")}
      <button class="delete-btn" type="button">Löschen</button>
    `;
        listNode.appendChild(li);
    });
}

/* =========================================
   Team-Auswahllogik
========================================= */

// Team-Dropdown je nach Kategorie befüllen
const TEAMS = {
    senioren: ["1_Herren", "2_Herren", "3_Herren"],
    junioren: [
        "B1", "B2", "C1", "D1", "D2", "D3", "D4",
        "E1", "E2", "E3", "F1", "F2", "Bambini1", "BambiniKG"
    ]
};

categorySel.addEventListener("change", () => {
    currentCategory = categorySel.value;
    teamSel.innerHTML = "<option value=''>Bitte wählen</option>";

    if (!currentCategory) {
        teamSel.disabled = true;
        listNode.innerHTML = "";
        form.style.display = "none";
        return;
    }
    TEAMS[currentCategory].forEach(t =>
        teamSel.insertAdjacentHTML("beforeend", `<option value="${t}">${t.replace("_", " ")}</option>`)
    );
    teamSel.disabled = false;
    form.style.display = "none";
    listNode.innerHTML = "";
});

teamSel.addEventListener("change", () => {
    currentTeam = teamSel.value;
    if (!currentTeam) {
        form.style.display = "none";
        listNode.innerHTML = "";
        return;
    }
    form.reset();
    form.style.display = "block";
    const data = loadPlayers(teamKey(currentCategory, currentTeam));
    renderList(data);
});

/* =========================================
   Formular: Spieler hinzufügen
========================================= */

form.addEventListener("submit", e => {
    e.preventDefault();
    if (!currentCategory || !currentTeam) return;

    const player = {
        id: Date.now().toString(36),
        name: nameInput.value.trim(),
        position: posInput.value.trim().toLowerCase(),
        foto: fotoInput.value.trim()
    };
    if (!player.name || !player.position) {
        alert("Name und Position sind erforderlich!");
        return;
    }

    const key = teamKey(currentCategory, currentTeam);
    const list = loadPlayers(key);
    list.push(player);
    savePlayers(key, list);
    renderList(list);
    form.reset();
});

/* =========================================
   Löschen mit Event-Delegation
========================================= */

listNode.addEventListener("click", e => {
    if (!e.target.classList.contains("delete-btn")) return;
    const id = e.target.closest("li").dataset.id;
    const key = teamKey(currentCategory, currentTeam);
    const list = loadPlayers(key).filter(p => p.id !== id);
    savePlayers(key, list);
    renderList(list);
});

/* =========================================
   Initialisierung (Seite frisch geladen)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Falls Kategorie & Team vorausgewählt bleiben sollen, könnte man
    // hier aus dem LocalStorage letzte Auswahl lesen und wieder setzen.
});

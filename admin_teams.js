// ======= admin_teams.js =======

const teamDaten = {
  senioren: ["1. Herren", "2. Herren", "3. Herren"],
  junioren: ["B1", "B2", "C1", "D1", "D2", "D3", "D4", "E1", "E2", "E3", "F1", "F2", "Bambini 1", "Bambini KG"]
};

const categorySelect = document.getElementById("categorySelect");
const teamSelect = document.getElementById("teamSelect");
const spielerForm = document.getElementById("spielerForm");
const spielerListe = document.querySelector(".spieler-liste");

categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;
  teamSelect.innerHTML = "";

  if (!selectedCategory || !teamDaten[selectedCategory]) {
    teamSelect.disabled = true;
    spielerForm.style.display = "none";
    return;
  }

  teamSelect.disabled = false;

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Bitte Team wählen";
  defaultOption.value = "";
  teamSelect.appendChild(defaultOption);

  teamDaten[selectedCategory].forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamSelect.appendChild(option);
  });

  spielerForm.style.display = "none";
  spielerListe.innerHTML = "";
});

teamSelect.addEventListener("change", () => {
  const selectedTeam = teamSelect.value;
  if (selectedTeam) {
    spielerForm.style.display = "block";
    renderSpielerListe(selectedTeam);
  } else {
    spielerForm.style.display = "none";
    spielerListe.innerHTML = "";
  }
});

spielerForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("spielerName").value.trim();
  const rawPosition = document.getElementById("position").value.trim().toLowerCase();
  const position = normalisierePosition(rawPosition);
  const foto = document.getElementById("fotoURL").value.trim();
  const team = teamSelect.value;

  if (!name || !position || !team) return;

  const spieler = { name, position, foto };
  const key = buildStorageKey(team);

  const vorhandene = JSON.parse(localStorage.getItem(key)) || [];
  vorhandene.push(spieler);
  localStorage.setItem(key, JSON.stringify(vorhandene));

  spielerForm.reset();
  renderSpielerListe(team);
});

function renderSpielerListe(team) {
  const key = buildStorageKey(team);
  const spieler = JSON.parse(localStorage.getItem(key)) || [];

  spielerListe.innerHTML = `<h3>Spieler in ${team}</h3>`;

  if (spieler.length === 0) {
    spielerListe.innerHTML += "<p>Keine Spieler eingetragen.</p>";
    return;
  }

  const list = document.createElement("ul");
  spieler.forEach((s, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${s.name}</strong> – ${formatierePosition(s.position)}
      <button data-index="${index}" class="delete-btn">Löschen</button>
    `;
    list.appendChild(li);
  });

  spielerListe.appendChild(list);

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const updated = JSON.parse(localStorage.getItem(key)) || [];
      updated.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(updated));
      renderSpielerListe(team);
    });
  });
}

function buildStorageKey(team) {
  return `spieler_${team.replace(/\s+/g, "_").replace(/\./g, "")}`;
}

function normalisierePosition(pos) {
  const map = {
    trainer: "trainer",
    torwart: "torwart",
    abwehr: "abwehr",
    mittelfeld: "mittelfeld",
    stürmer: "stürmer",
    stuermer: "stürmer" // falls ö durch ue ersetzt wird
  };

  return map[pos.toLowerCase()] || pos.toLowerCase();
}

function formatierePosition(pos) {
  const map = {
    trainer: "Trainer",
    torwart: "Torwart",
    abwehr: "Abwehr",
    mittelfeld: "Mittelfeld",
    stürmer: "Stürmer"
  };

  return map[pos.toLowerCase()] || pos.charAt(0).toUpperCase() + pos.slice(1);
}

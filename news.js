document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("allNews");
    const newsList = JSON.parse(localStorage.getItem("newsList")) || [];

    if (!newsContainer) return;

    if (newsList.length === 0) {
        newsContainer.innerHTML = "<p>Keine News vorhanden.</p>";
        return;
    }

    // Sortiere nach Datum absteigend (neueste zuerst)
    newsList.sort((a, b) => new Date(b.date) - new Date(a.date));

    newsList.forEach(news => {
        const box = document.createElement("div");
        box.className = "news-box";

        const date = document.createElement("span");
        date.className = "news-date";
        date.textContent = news.date;

        const title = document.createElement("h3");
        title.textContent = news.title;

        const content = document.createElement("p");
        content.textContent = news.content;

        box.appendChild(date);
        box.appendChild(title);
        box.appendChild(content);

        newsContainer.appendChild(box);
    });
});

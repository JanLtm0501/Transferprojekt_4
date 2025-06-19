document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("allNews");
    const news = JSON.parse(localStorage.getItem("newsList")) || [];
  
    if (news.length === 0) {
      container.innerHTML = "<p>Es sind derzeit keine News vorhanden.</p>";
      return;
    }
  
    news.forEach(item => {
      const box = document.createElement("div");
      box.className = "news-box";
      box.innerHTML = `
        <span class="news-date">${item.date}</span>
        <h3>${item.title}</h3>
        <p>${item.content}</p>
      `;
      container.appendChild(box);
    });
  });
  
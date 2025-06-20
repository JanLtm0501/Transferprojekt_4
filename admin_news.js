const form = document.getElementById('newsForm');
const newsItems = document.getElementById('newsItems');

function renderNews() {
    const news = JSON.parse(localStorage.getItem('newsList')) || [];
    newsItems.innerHTML = '';
    news.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'news-item';
        div.innerHTML = `
      <h3>${item.title}</h3>
      <small>${item.date}</small>
      <p>${item.content}</p>
      <button onclick="deleteNews(${index})">Löschen</button>
    `;
        newsItems.appendChild(div);
    });
}

function deleteNews(index) {
    const news = JSON.parse(localStorage.getItem('newsList')) || [];
    news.splice(index, 1);
    localStorage.setItem('newsList', JSON.stringify(news));
    renderNews();
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('newsTitle').value;
    const date = document.getElementById('newsDate').value;
    const content = document.getElementById('newsContent').value;

    const news = JSON.parse(localStorage.getItem('newsList')) || [];
    news.unshift({ title, date, content });
    localStorage.setItem('newsList', JSON.stringify(news));

    form.reset();
    renderNews();
});

renderNews();
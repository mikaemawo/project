const cardContainer = document.getElementById('card-container');

async function getCardsData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        const limitedData = data.slice(0, 12);

        limitedData.forEach(post => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
        <img src="https://i.pinimg.com/736x/17/e6/b1/17e6b198bf5f6fcdbb9cd85363503ca8.jpg">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;

            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка при получении карточек:', error);
        cardContainer.innerHTML = `<p style="color:red;">Не удалось загрузить карточки.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', getCardsData);
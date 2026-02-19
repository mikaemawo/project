const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentIndex = 0;

const hideBlocks = () => {
    tabBlocks.forEach(item => item.style.display = 'none');
    tabs.forEach(item => item.classList.remove('tab_content_item_active'));
};

const showBlock = (index = 0) => {
    tabBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};

hideBlocks();
showBlock(currentIndex);

tabsParent.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
        tabs.forEach((item, index) => {
            if (event.target === item) {
                currentIndex = index;
                hideBlocks();
                showBlock(currentIndex);
            }
        });
    }
});

setInterval(() => {
    currentIndex++;
    if (currentIndex >= tabBlocks.length) {
        currentIndex = 0;
    }
    hideBlocks();
    showBlock(currentIndex);
}, 3000);

// converter

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const francInput = document.querySelector("#franc");

const converter = (element) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');

            if (!response.ok) {
                throw new Error('Ошибка загрузки converter.json');
            }

            const data = await response.json();

            if (element.id === 'som') {
                usdInput.value = (element.value / data.usd).toFixed(2);
                francInput.value = (element.value / data.franc).toFixed(2);
            } else if (element.id === 'usd') {
                somInput.value = (element.value * data.usd).toFixed(2);
                francInput.value = ((element.value * data.usd) / data.franc).toFixed(2);
            } else if (element.id === 'franc') {
                usdInput.value = ((element.value * data.franc) / data.usd).toFixed(2);
                somInput.value = (element.value * data.franc).toFixed(2);
            }

            if (element.value === '') {
                somInput.value = '';
                usdInput.value = '';
                francInput.value = '';
            }

        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
};

converter(somInput);
converter(usdInput);
converter(francInput);


// CARD SWITCHER

const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
const card = document.querySelector(".card");
let cardId = 1;

async function getData(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

        if (!response.ok) {
            throw new Error('Ошибка загрузки TODO');
        }

        const data = await response.json();

        const { title, id: todoId, completed } = data;
        const completedTitle = completed ? 'yes' : 'no';
        const completedColor = completed ? 'green' : 'red';

        card.innerHTML = `
            <p>${title}</p>
            <p style="color: ${completedColor}">
                ${completedTitle}
            </p>
            <span>${todoId}</span>
        `;

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

btnNext.onclick = () => {
    cardId = cardId >= 200 ? 1 : cardId + 1;
    getData(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? 200 : cardId - 1;
    getData(cardId);
};

getData(cardId);


// POSTS

async function posts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error('Ошибка загрузки posts');
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

posts();







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
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
    xhr.open('GET', '../data/converter.json')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send()

    xhr.onload = () => {
        const data = JSON.parse(xhr.response)
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
        }
    }
}

converter(somInput);
converter(usdInput);
converter(francInput);


// card switcher

const btnNext = document.querySelector("#btn-next")
const btnPrev = document.querySelector("#btn-prev")
const card = document.querySelector(".card")
let cardId = 1

    function getData(id) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => response.json())
    .then(data => {
        const {title, id, completed} = data
        const completedTitle = completed ? 'yes' : 'no'
        const completedColor = completed ? 'green' : 'red'

        card.innerHTML = `
        <p> ${title} </p>
        <p style = "color: ${completedColor}">
            ${completedTitle}
        </p>
        <span>${id}</span>
        `
        })
    }

    btnNext.onclick = () => {
    cardId = cardId >= 200 ? 1 : cardId + 1;
    getData(cardId);
    }

    btnPrev.onclick = () => {
        cardId = cardId <= 1 ? 200 : cardId - 1;
        getData(cardId);
    }
    getData(cardId);

    function posts() {
        fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))
    }
    posts()
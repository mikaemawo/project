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

converter(somInput)
converter(usdInput)
converter(francInput)
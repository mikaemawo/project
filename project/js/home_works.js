const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');

let regExp = /^\w{3,}@\w+\.\w{2,4}\D$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.textContent = 'Верно';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'Ошибка';
        gmailResult.style.color = 'red';
    }
}


const block = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let moveX = 0;
let moveY = 0;


let sizeX = parentBlock.clientWidth - block.offsetWidth;
let sizeY = parentBlock.clientHeight - block.offsetHeight;

function moveBlock() {
        if (moveX < sizeX && moveY === 0) {
            moveX++;
            block.style.left =`${moveX}px`;
        }else if (moveX >= sizeX && moveY < sizeY) {
            moveY++;
            block.style.top = moveY + 'px';
        }
        else if (moveY >= sizeY && moveX > 0) {
            moveX--;
            block.style.left = moveX + 'px';
        }else if (moveX === 0 && moveY > 0) {
            moveY--;
            block.style.top = moveY + 'px';
        }
        
requestAnimationFrame(moveBlock);
}
moveBlock()


const secondBlock = document.querySelector('#seconds');
const btnStart = document.getElementById('start');
const btnStop = document.getElementById('stop');
const btnReset = document.getElementById('reset');

let seconds = 0;
let interval = null   

btnStart.onclick = () => {
    if (interval === null) {
        interval = setInterval(() => {
            seconds++;
            secondBlock.textContent = seconds;
        }, 1000);
}
}
btnStop.onclick = () => {
    clearInterval(interval);
    interval = null;
}
btnReset.onclick = () => {
    clearInterval(interval);
    interval = null;
    seconds = 0;
    secondBlock.textContent = seconds;
}


const renderCard = (characters) => {
    const characterList = document.querySelector('.characters-list');

    characters.forEach(character => {
        const div = document.createElement('div');
        div.className = 'character-card';

        div.innerHTML = `
            <div>
                <div class="character-photo">
                    <img src="${character.photo}" alt="">
                </div>
                <h3>${character.name}</h3>
                <h4>${character.age}</h4>
            </div>
        `;

        characterList.appendChild(div);
    });
};

async function getCharacters() {
    try {
        const response = await fetch('../data/characters.json');

        if (!response.ok) {
            throw new Error('Ошибка загрузки characters.json');
        }

        const characters = await response.json();
        renderCard(characters);

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

getCharacters();


// ================== FETCH BIO ==================

async function getBio() {
    try {
        const response = await fetch('../data/bio.json');

        if (!response.ok) {
            throw new Error('Ошибка загрузки bio.json');
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

getBio();
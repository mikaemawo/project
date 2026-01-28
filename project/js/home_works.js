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

let sizeX = parentBlock.clientWidth - block.offsetWidth;


function moveBlock() {
        if (moveX < sizeX) {
            moveX++;
            block.style.left =`${moveX}px`;
        }
        
requestAnimationFrame(moveBlock);
}
moveBlock()
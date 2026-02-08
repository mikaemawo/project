const modal = document.querySelector('.modal')
const openModalBtn = document.querySelector('.btn')
const closeModalBtn = document.querySelector('.modal_close')

const open = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const close = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

openModalBtn.onclick = open
closeModalBtn.onclick = close
modal.onclick = (event) => {
    if (event.target === modal) close()
}

const showModalByScroll = () => {
const scroll = document.documentElement.scrollTop
const screen = document.documentElement.clientHeight
const page = document.documentElement.scrollHeight

if (scroll + screen >= page){
    open()
    document.removeEventListener('scroll', showModalByScroll )
}
}
document.addEventListener('scroll', showModalByScroll)

setTimeout(() => {
    open();
}, 10000)

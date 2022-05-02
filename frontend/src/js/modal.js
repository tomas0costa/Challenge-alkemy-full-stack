//DARK-MODE
const darkMode = document.querySelector('#dark-mode');

darkMode.addEventListener('click',darkModeColor, false)

function darkModeColor() {

    const body = document.querySelector('body')
    body.classList.toggle("dark-mode");
 
}
//Modal lateral
const burger = document.querySelector('#burger');
const modalLateral = document.querySelector('.modal-lateral');
const modalLateralButton = document.querySelector('.modal-lateral__nav');
const btnCls = document.querySelector('.btn-cls');

burger.addEventListener('click',openModalLateral,false);
btnCls.addEventListener('click',closeModalLateral,false);

function openModalLateral() {
    modalLateral.style.width = '60%';
    modalLateralButton.style.right = '0';
    btnCls.style.right = '0';
}
function closeModalLateral() {
    modalLateral.style.width = '0';
    modalLateralButton.style.right = '100rem';
    btnCls.style.right = '100rem';
}

import CONSTANTS from './constants.js';

const closeModalBtn = document.getElementById('closeModalBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.querySelector('.modal .content');
const getMonth = () => document.getElementById('month-title').textContent;

document.body.addEventListener(CONSTANTS.EVENTS.CLICK, (event) => {
    const isValidDay = event.target.classList.contains('day');
    const isOffDay = event.target.classList.contains('day-off');
    const isDisabled = event.target.classList.contains('disabled');

    if (isValidDay && !isOffDay && !isDisabled) {
        modalBackdrop.classList.remove(CONSTANTS.CLASSES.D_NONE);
        const day = event.target.textContent;
        modalContent.innerHTML = `${day} ${getMonth()}`;
    }
});

closeModalBtn.addEventListener(CONSTANTS.EVENTS.CLICK, () => {
    modalBackdrop.classList.add(CONSTANTS.CLASSES.D_NONE);
});

modalBackdrop.addEventListener(CONSTANTS.EVENTS.CLICK, (event) => {
    if (event.target === modalBackdrop) {
        modalBackdrop.classList.add(CONSTANTS.CLASSES.D_NONE);
    }
});
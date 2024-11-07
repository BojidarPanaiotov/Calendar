import CONSTANTS from './constants.js';


document.body.addEventListener(CONSTANTS.EVENTS.CLICK, (event) => {
    const isValidDay = event.target.classList.contains('day');
    const isOffDay = event.target.classList.contains('day-off');
    const isDisabled = event.target.classList.contains('disabled');

    if (isValidDay && !isOffDay && !isDisabled) {

    }
});
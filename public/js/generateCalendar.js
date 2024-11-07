import CONSTANTS from './constants.js';

const currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const calendarGrid = document.createElement(CONSTANTS.ELEMENTS.DIV);
    calendarGrid.classList.add('calendar-grid');

    const monthTitle = monthNames[month];
    document.getElementById('month-title').textContent = `${monthTitle} ${year}`;

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
        const dayHeader = document.createElement(CONSTANTS.ELEMENTS.DIV);
        dayHeader.classList.add('day-header');
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement(CONSTANTS.ELEMENTS.DIV);
        emptyCell.classList.add('day');
        emptyCell.classList.add('day-off');
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay; day++) {
        const dayCell = document.createElement(CONSTANTS.ELEMENTS.DIV);
        dayCell.classList.add('day');
        dayCell.textContent = day;
        calendarGrid.appendChild(dayCell);

        dayCell.setAttribute('data-toggle', 'modal');
        dayCell.setAttribute('data-target', '#simpleModal');
    }

    const calendarContainer = document.getElementById('calendar');
    calendarContainer.classList.add('fade-out');

    setTimeout(() => {
        calendarContainer.innerHTML = '';
        calendarContainer.appendChild(calendarGrid);
        calendarContainer.classList.remove('fade-out');
        calendarContainer.classList.add('fade-in');
        document.querySelector('.calendar-container').classList.add('fade-in');
    }, 500);
}

document.getElementById('prev-month').addEventListener(CONSTANTS.EVENTS.CLICK, () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentYear, currentMonth);
});

document.getElementById('next-month').addEventListener(CONSTANTS.EVENTS.CLICK, () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentYear, currentMonth);
});

generateCalendar(currentYear, currentMonth);
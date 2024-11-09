import CONSTANTS from './constants.js';

const currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const $calendarGrid = $('<div>', { class: 'calendar-grid' });

    const monthTitle = CONSTANTS.MONTHS[month];
    $('#month-title').text(`${monthTitle} ${year}`);

    const weekdays = CONSTANTS.WEEK_DAYS;
    weekdays.forEach(day => {
        const $dayHeader = $('<div>', { class: 'day-header', text: day });
        $calendarGrid.append($dayHeader);
    });

    for (let i = 0; i < firstDay; i++) {
        const $emptyCell = $('<div>', { class: 'day day-off disabled' });
        $calendarGrid.append($emptyCell);
    }

    for (let day = 1; day <= lastDay; day++) {
        const $dayCell = $('<div>', { class: 'day', text: day });
        $calendarGrid.append($dayCell);

        $dayCell.attr({
            'data-toggle': 'modal',
            'data-target': '#simpleModal'
        });
    }

    const $calendarContainer = $('#calendar');
    $calendarContainer.addClass('fade-out');

    setTimeout(() => {
        $calendarContainer.empty().append($calendarGrid).removeClass('fade-out').addClass('fade-in');
    }, 500);
}

$('#prev-month').on(CONSTANTS.EVENTS.CLICK, () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentYear, currentMonth);
});

$('#next-month').on(CONSTANTS.EVENTS.CLICK, () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentYear, currentMonth);
});

generateCalendar(currentYear, currentMonth);

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $(this).html($('#sidebar').hasClass('active') ? '&#9664;' : '&#9654;');
    });
});

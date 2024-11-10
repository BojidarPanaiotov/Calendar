import CONSTANTS from './constants.js';

const currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function generateCalendar(year, month, userEvents) {
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

        if (userEvents) {
            $.each(userEvents, function(index, event) {
                if (day === event.day && month === event.month && year === event.year) {
                    $dayCell.addClass(event.action);

                    return;
                }
            });
        }

        $dayCell.attr({
            'data-toggle': 'modal',
            'data-target': '#event-slot-modal'
        });
        $calendarGrid.append($dayCell);
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

$('#event-slot-modal').on('show.bs.modal', function (event) {
    const $modal = $(this);
    const day = $(event.relatedTarget).text();
    const monthAndYear = $('.js-month-year').text().split(' ');
    const month = monthAndYear[0];
    const year = monthAndYear[1];

    $modal.data('day', day);
    $modal.data('month', month);
    $modal.data('year', year);
});

function getDay($button) {
    const $modal = $button.closest('#event-slot-modal');
    const day = $modal.data('day');
    const $day = $('.day:visible').filter(function () {
        return $(this).text().trim() === day;
    });

    return $day;
}

$('.js-disable-button').on('click', function () {
    const $button = $(this);
    const $day = getDay($button);
    $day.addClass('disabled');
});

$('.js-enable-button').on('click', function () {
    const $button = $(this);
    const $day = getDay($button);
    $day.removeClass('disabled');
});


$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $(this).html($('#sidebar').hasClass('active') ? '&#9664;' : '&#9654;');
    });
});

$.ajax({
    url: '/api/getUserDates',
    method: 'GET',
    success: function (response) {
        const events = response;

        generateCalendar(currentYear, currentMonth, events);
    }
});
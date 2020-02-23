export const WEEKDAYS_SHORT = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
}

export const MONTHS = {
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
}

export const WEEKDAYS_LONG = {
  ru: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
}

export const FIRST_DAY_OF_WEEK = {
  ru: 1,
}
// Translate aria-labels
export const LABELS = {
  ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' },
}

export const localeProps = (locale: keyof typeof LABELS = 'ru') => ({
  locale,
  months: MONTHS[locale],
  weekdaysLong: WEEKDAYS_LONG[locale],
  weekdaysShort: WEEKDAYS_SHORT[locale],
  firstDayOfWeek: FIRST_DAY_OF_WEEK[locale],
  labels: LABELS[locale],
})

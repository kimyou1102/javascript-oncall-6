import { holiday, endDays, defaultWeek } from '../constants/dayInfo.js';

export default class Calendar {
  #month;
  #day;

  constructor(month, day) {
    this.#month = month;
    this.#day = day;
  }

  getCalendar() {
    const week = this.getWeek();
    return this.createCalendar(week);
  }

  createCalendar(week) {
    const calendar = {};
    const endDay = endDays[this.#month];
    for (let i = 1; i <= endDay; i++) {
      const day = week[(i - 1) % 7];
      calendar[i] = {
        day,
        type: this.getDayType(day, i),
      };
    }
    return calendar;
  }

  getDayType(day, date) {
    if (day === '토' || day === '일') {
      return '휴일';
    }
    if (holiday[this.#month] && holiday[this.#month] === date) {
      return '휴일';
    }
    return '평일';
  }

  getWeek() {
    const index = defaultWeek.indexOf(this.#day);
    return [...defaultWeek.splice(index), ...defaultWeek.splice(0, index)];
  }
}

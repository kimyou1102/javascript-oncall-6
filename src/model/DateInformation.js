import { endDayInfo, publicHolidays } from '../constant/date.js';

export default class DateInformation {
  constructor(month, startDay) {
    this.month = month;
    this.startDay = startDay;
  }

  getAssignedDayTypeMonthInfo() {
    const monthInfo = this.getMonthInfo();
    const holiday = publicHolidays[this.month];

    if (holiday) {
      monthInfo[holiday] = { ...monthInfo[holiday], type: '휴일' };
    }
    return monthInfo;
  }

  getMonthInfo() {
    const monthInfo = {};
    const dayInfo = this.getDayInfo();
    for (let i = 0; i < endDayInfo[this.month]; i++) {
      const x = [i % 7];
      const type = this.getDayType(dayInfo[x]);
      monthInfo[i + 1] = { day: dayInfo[x], type: type };
    }
    return monthInfo;
  }

  getDayType(day) {
    let type = '평일';
    if (day === '토' || day === '일') type = '휴일';
    return type;
  }

  getDayInfo() {
    const week = ['월', '화', '수', '목', '금', '토', '일'];
    const startIndex = week.indexOf(this.startDay);
    const sortedWeek = [...week.slice(startIndex), ...week.slice(0, startIndex)];
    const dayInfo = {};
    sortedWeek.forEach((day, index) => (dayInfo[index] = day));
    return dayInfo;
  }
}

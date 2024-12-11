export default class WorkAssignment {
  constructor(calendar, weekDayWorkList, holidayWorkList) {
    this.calendar = calendar;
    this.weekDayWorkList = weekDayWorkList;
    this.holidayWorkList = holidayWorkList;
    this.weekDayIndex = 0;
    this.holidayIndex = 0;
    this.weekDayPrevIndex = Infinity;
    this.holidayPrevIndex = Infinity;
  }

  getcalendarAssignmentWork() {
    for (const [date, info] of Object.entries(this.calendar)) {
      const before = this.calendar[Number(date - 1)];
      if (info.type === '휴일') {
        this.updateHoliday(date, before);
      }
      if (info.type === '평일') {
        this.updaetWeekday(date, before);
      }
    }
    return this.calendar;
  }

  updaetWeekday(date, before) {
    let name = this.weekDayWorkList[this.weekDayIndex % this.weekDayWorkList.length];
    if (this.weekDayPrevIndex !== Infinity) {
      name = this.weekDayWorkList[this.weekDayPrevIndex % this.weekDayWorkList.length];
      this.weekDayPrevIndex = Infinity;
    }

    if (before && before.name === name) {
      this.weekDayPrevIndex = this.weekDayIndex;
      name = this.weekDayWorkList[(this.weekDayIndex + 1) % this.weekDayWorkList.length];
    }
    this.calendar[date].name = name;
    this.weekDayIndex += 1;
  }

  updateHoliday(date, before) {
    let name = this.holidayWorkList[this.holidayIndex % this.holidayWorkList.length];
    if (this.holidayPrevIndex !== Infinity) {
      name = this.holidayWorkList[this.holidayPrevIndex % this.holidayWorkList.length];
      this.holidayPrevIndex = Infinity;
    }

    if (before && before.name === name) {
      this.holidayPrevIndex = this.holidayIndex;
      name = this.holidayWorkList[(this.holidayIndex + 1) % this.holidayWorkList.length];
    }
    this.calendar[date].name = name;
    this.holidayIndex += 1;
  }
}

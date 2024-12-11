import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Calendar from '../model/Calendar.js';
import { validateDate, validateWokerList } from '../utils/validation.js';

export default class Controller {
  async start() {
    const [month, day] = await this.getAllocationDate();
    const { weekDayWorkList, holidayWorkList } = await this.getWorkerList();
    const calendar = new Calendar(month, day).getCalendar();
    this.assignmentWork(weekDayWorkList, holidayWorkList, calendar);
    OutputView.printWorkSchedule(month, calendar);
  }

  async getAllocationDate() {
    try {
      const input = await InputView.getAllocationDate();
      validateDate(input);
      return input.split(',');
    } catch (error) {
      OutputView.printError(error.message);
      return await this.getAllocationDate();
    }
  }

  async getWorkerList() {
    try {
      const weekDayWorkList = await InputView.getWeekdayWorkList();
      validateWokerList(weekDayWorkList);
      const holidayWorkList = await InputView.getHolidayWorkList();
      validateWokerList(holidayWorkList);
      return {
        weekDayWorkList: weekDayWorkList.split(','),
        holidayWorkList: holidayWorkList.split(','),
      };
    } catch (error) {
      OutputView.printError(error.message);
      return await this.getWorkerList();
    }
  }

  // eslint-disable-next-line max-lines-per-function
  assignmentWork(weekDayWorkList, holidayWorkList, calendar) {
    let weekDayIndex = 0;
    let holidayIndex = 0;
    let weekDayPrevIndex = Infinity;
    let holidayPrevIndex = Infinity;

    for (const [date, info] of Object.entries(calendar)) {
      const before = calendar[Number(date - 1)];
      if (info.type === '휴일') {
        let name = holidayWorkList[holidayIndex % holidayWorkList.length];
        // eslint-disable-next-line max-depth
        if (holidayPrevIndex !== Infinity) {
          name = holidayWorkList[holidayPrevIndex % holidayWorkList.length];
          holidayPrevIndex = Infinity;
        }
        // eslint-disable-next-line max-depth
        if (before && before.name === name) {
          holidayPrevIndex = holidayIndex;
          name = holidayWorkList[(holidayIndex + 1) % holidayWorkList.length];
        }
        calendar[date].name = name;
        holidayIndex += 1;
      }
      if (info.type === '평일') {
        let name = weekDayWorkList[weekDayIndex % weekDayWorkList.length];
        // eslint-disable-next-line max-depth
        if (weekDayPrevIndex !== Infinity) {
          name = weekDayWorkList[weekDayPrevIndex % weekDayWorkList.length];
          weekDayPrevIndex = Infinity;
        }
        // eslint-disable-next-line max-depth
        if (before && before.name === name) {
          weekDayPrevIndex = weekDayIndex;
          name = weekDayWorkList[(weekDayIndex + 1) % weekDayWorkList.length];
        }
        calendar[date].name = name;
        weekDayIndex += 1;
      }
    }
  }
}

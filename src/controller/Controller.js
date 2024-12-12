import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Calendar from '../model/Calendar.js';
import WorkAssignment from '../model/WorkAssignment.js';
import { validateDate, validateWokerList } from '../utils/validation.js';

export default class Controller {
  constructor() {
    this.weekDayIndex = 0;
    this.holidayIndex = 0;
    this.weekDayPrevIndex = Infinity;
    this.holidayPrevIndex = Infinity;
  }
  async start() {
    const [month, day] = await this.getAllocationDate();
    const { weekDayWorkList, holidayWorkList } = await this.getWorkerList();
    const calendar = new Calendar(month, day).getCalendar();
    const workAssignment = new WorkAssignment(calendar, weekDayWorkList, holidayWorkList);
    const assignedCalendar = workAssignment.getcalendarAssignmentWork();
    OutputView.printWorkSchedule(month, assignedCalendar);
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
}

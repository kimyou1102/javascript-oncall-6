import InputView from '../view/InputView.js';
import Calendar from '../model/Calendar.js';

export default class Controller {
  async start() {
    const [month, day] = await InputView.getAllocationDate();
    const weekDayWorkList = await InputView.getWeekdayWorkList();
    const holidayWorkList = await InputView.getHolidayWorkList();
    const calendar = new Calendar(month, day).getCalendar();
  }
}

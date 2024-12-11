import InputView from '../view/InputView.js';

export default class Controller {
  async start() {
    const dateInput = InputView.getAllocationDate();
    const [month, day] = dateInput.split(',');
    const weekDayWorkList = InputView.getWeekdayWorkList();
    const holidayWorkList = InputView.getHolidayWorkList();
  }
}

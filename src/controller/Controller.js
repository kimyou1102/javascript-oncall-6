import InputView from '../view/InputView.js';
import OutputView from '../view/outputView.js';
import DateInformation from '../model/DateInformation.js';
import { validateAssignmentInfor, validateWorkerList } from '../utils/validation.js';
export class Controller {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }
  async run() {
    const [month, day] = await this.getAssignmentInfor();
    const dateInformation = new DateInformation(month, day);
    const monthInfo = dateInformation.getAssignedDayTypeMonthInfo();
    const weekdays = await this.getWeekdaysInput();
    const dayOff = await this.getDayOff();
    const data = this.assignEmergencyWork(weekdays, dayOff, monthInfo);
    this.outputView.printWorkSchedule(month, data);
  }

  // eslint-disable-next-line max-lines-per-function
  assignEmergencyWork(weekdays, dayOff, monthInfo) {
    const obj = {};
    let weekdaysIndex = 0;
    let dayOffIndex = 0;
    // const weekdays 일단 이거 나중에 모델로 분리하면 속성값이니 지금은 걍 매개변수 변경으로 가자
    for (const [date, dateInfo] of Object.entries(monthInfo)) {
      obj[date] = { ...dateInfo };

      const beforeInfo = obj[Number(date) - 1];
      if (dateInfo.type === '평일') {
        // 이전 요일이 휴일이고, 관리자가 지금넣어줄 관리자랑 같다면 다음 관리자로 순서를 변경
        // 근데 다음이 없다면?
        // eslint-disable-next-line max-depth
        if (
          beforeInfo &&
          beforeInfo.type === '휴일' &&
          beforeInfo.manager === weekdays[weekdaysIndex % weekdays.length]
        ) {
          let temp = weekdays[weekdaysIndex % weekdays.length];
          weekdays[weekdaysIndex % weekdays.length] =
            weekdays[(weekdaysIndex + 1) % weekdays.length];
          weekdays[(weekdaysIndex + 1) % weekdays.length] = temp;
        }
        obj[date] = { ...dateInfo, manager: weekdays[weekdaysIndex % weekdays.length] };
        weekdaysIndex += 1;
      }
      if (dateInfo.type === '휴일') {
        // eslint-disable-next-line max-depth
        if (
          beforeInfo &&
          beforeInfo.type === '평일' &&
          beforeInfo.manager === dayOff[dayOffIndex % dayOff.length]
        ) {
          let temp = dayOff[dayOffIndex % dayOff.length];
          dayOff[dayOffIndex % dayOff.length] = dayOff[(dayOffIndex + 1) % dayOff.length];
          dayOff[(dayOffIndex + 1) % dayOff.length] = temp;
        }
        obj[date] = { ...dateInfo, manager: dayOff[dayOffIndex % dayOff.length] };
        dayOffIndex += 1;
      }
    }
    return obj;
  }

  async getAssignmentInfor() {
    const assignmentInfor = await this.getValidatedInputWithRetry(
      '비상 근무를 배정할 월과 시작 요일을 입력하세요',
      validateAssignmentInfor,
    );

    const [month, day] = assignmentInfor.split(',');
    return [month, day];
  }

  async getWeekdaysInput() {
    const weekdaysInput = await this.getValidatedInputWithRetry(
      '평일 비상 근무 순번대로 사원 닉네임을 입력하세요',
      validateWorkerList,
    );

    return weekdaysInput.split(',');
  }

  async getDayOff() {
    const dayOffInput = await this.getValidatedInputWithRetry(
      '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요',
      validateWorkerList,
    );

    return dayOffInput.split(',');
  }

  async getValidatedInputWithRetry(message, validate) {
    try {
      const input = await this.inputView.getInput(message);
      validate(input);
      return input;
    } catch (error) {
      this.outputView.printError(error.message);
      return await this.getValidatedInputWithRetry(message, validate);
    }
  }
}

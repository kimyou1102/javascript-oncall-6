import InputView from '../view/InputView.js';
import OutputView from '../view/outputView.js';
import DateInformation from '../model/DateInformation.js';
import { validateAssignmentInfor, validateWorkerList } from '../utils/validation.js';
import EmergencyWorkersList from '../model/EmergencyWorkersList.js';

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
    const emergencyWorkerList = new EmergencyWorkersList(weekdays, dayOff, monthInfo);
    const emergencyWorkers = emergencyWorkerList.assignEmergencyWorkerList();
    this.outputView.printWorkSchedule(month, emergencyWorkers);
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

import { Console } from '@woowacourse/mission-utils';

export default class InputView {
  static async getAllocationDate() {
    const input = await InputView.getInput('비상 근무를 배정할 월과 시작 요일을 입력하세요> ');
    return input;
  }

  static async getWeekdayWorkList() {
    const input = await InputView.getInput('평일 비상 근무 순번대로 사원 닉네임을 입력하세요> ');
    return input;
  }

  static async getHolidayWorkList() {
    const input = await InputView.getInput('휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ');
    return input;
  }

  static async getInput(message) {
    try {
      return await Console.readLineAsync(`${message}\n`);
    } catch (error) {
      return '';
    }
  }
}

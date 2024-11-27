import { Console } from '@woowacourse/mission-utils';

export default class OutputView {
  printWorkSchedule(month, monthInfo) {
    for (const [date, dateInfo] of Object.entries(monthInfo)) {
      if (dateInfo.type === '휴일' && !(dateInfo.day === '토' || dateInfo.day === '일')) {
        Console.print(`${month}월 ${date}일 ${dateInfo.day}(휴일) ${dateInfo.manager}`);
        continue;
      }
      Console.print(`${month}월 ${date}일 ${dateInfo.day} ${dateInfo.manager}`);
    }
  }

  printError(message) {
    Console.print(message);
  }
}

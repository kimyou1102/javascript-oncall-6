import { Console } from '@woowacourse/mission-utils';

export default class OutputView {
  static printWorkSchedule(month, calendar) {
    for (const [date, info] of Object.entries(calendar)) {
      if (!(info.day === '토' || info.day === '일') && info.type === '휴일') {
        Console.print(`${month}월 ${date}일 ${info.day}(휴일) ${info.name}`);
        continue;
      }
      Console.print(`${month}월 ${date}일 ${info.day} ${info.name}`);
    }
  }
}

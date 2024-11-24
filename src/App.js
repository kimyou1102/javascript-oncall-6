import InputView from './view/InputView.js';
import OutputView from './view/outputView.js';

const endDayInfo = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const publicHolidays = {
  1: 1,
  3: 1,
  5: 5,
  6: 6,
  8: 15,
  10: 3,
  10: 9,
  12: 25,
};

class App {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }
  // eslint-disable-next-line max-lines-per-function
  async run() {
    const assignmentInfor = await this.inputView.getInput(
      '비상 근무를 배정할 월과 시작 요일을 입력하세요',
    );

    const [month, day] = assignmentInfor.split(',');
    const monthInfo = this.getMonthInfo(month, day);

    const weekdaysInput = await this.inputView.getInput(
      '평일 비상 근무 순번대로 사원 닉네임을 입력하세요',
    );
    const dayOffInput = await this.inputView.getInput(
      '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요',
    );
    const weekdays = weekdaysInput.split(',');
    const dayOff = dayOffInput.split(',');
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

  // eslint-disable-next-line max-lines-per-function
  getMonthInfo(month, day) {
    const endDay = endDayInfo[month];
    const obj = {};
    const dayInfo = this.getDayInfo(day);
    for (let i = 0; i < endDay; i++) {
      const x = [i % 7];
      const type = this.getDayType(dayInfo[x]);
      obj[i + 1] = { day: dayInfo[x], type: type };
    }
    // 공휴일인 달에만, 해당 날짜만 변경
    const holiday = publicHolidays[month];
    if (holiday) {
      obj[holiday] = { ...obj[holiday], type: '휴일' };
    }
    return obj;
  }

  getDayType(day) {
    let type = '평일';
    if (day === '토' || day === '일') type = '휴일';
    return type;
  }

  getDayInfo(day) {
    const dayArr = ['월', '화', '수', '목', '금', '토', '일'];
    const startIndex = dayArr.indexOf(day);
    const dayArr2 = [...dayArr.slice(startIndex), ...dayArr.slice(0, startIndex)];
    const obj = {};
    for (let i = 0; i < dayArr2.length; i++) {
      obj[i] = dayArr2[i];
    }
    return obj;
  }
}

export default App;

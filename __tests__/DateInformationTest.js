import DateInformation from '../src/model/DateInformation.js';

describe('날짜 정보 클래스 테스트', () => {
  test('날짜별로 평일 또는 휴일인지 할당한 월 정보를 얻을 수 있다. ', () => {
    const MONTH = '2';
    const START_DAY = '일';
    const dateInformation = new DateInformation(MONTH, START_DAY);

    const EXPECTED_RESULT = {
      1: { day: '일', type: '휴일' },
      2: { day: '월', type: '평일' },
      3: { day: '화', type: '평일' },
      4: { day: '수', type: '평일' },
      5: { day: '목', type: '평일' },
      6: { day: '금', type: '평일' },
      7: { day: '토', type: '휴일' },
      8: { day: '일', type: '휴일' },
      9: { day: '월', type: '평일' },
      10: { day: '화', type: '평일' },
      11: { day: '수', type: '평일' },
      12: { day: '목', type: '평일' },
      13: { day: '금', type: '평일' },
      14: { day: '토', type: '휴일' },
      15: { day: '일', type: '휴일' },
      16: { day: '월', type: '평일' },
      17: { day: '화', type: '평일' },
      18: { day: '수', type: '평일' },
      19: { day: '목', type: '평일' },
      20: { day: '금', type: '평일' },
      21: { day: '토', type: '휴일' },
      22: { day: '일', type: '휴일' },
      23: { day: '월', type: '평일' },
      24: { day: '화', type: '평일' },
      25: { day: '수', type: '평일' },
      26: { day: '목', type: '평일' },
      27: { day: '금', type: '평일' },
      28: { day: '토', type: '휴일' },
    };

    expect(dateInformation.getAssignedDayTypeMonthInfo()).toEqual(EXPECTED_RESULT);
  });
});

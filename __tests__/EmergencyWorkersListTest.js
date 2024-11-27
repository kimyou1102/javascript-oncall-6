import EmergencyWorkersList from '../src/model/EmergencyWorkersList';

describe('날짜 정보 클래스 테스트', () => {
  test('날짜별로 평일 또는 휴일인지 할당한 월 정보를 얻을 수 있다. ', () => {
    const WEEKDAYS_WORKERS_LIST = ['오션', '수달', '우코', '슬링키', '참새', '도리'];
    const DAYOFFWORKERSLIST = ['슬링키', '참새', '도리', '오션', '수달', '우코'];
    const MONTH_INFO = {
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

    const EXPECTED_RESULT = {
      1: { day: '일', type: '휴일', manager: '슬링키' },
      2: { day: '월', type: '평일', manager: '오션' },
      3: { day: '화', type: '평일', manager: '수달' },
      4: { day: '수', type: '평일', manager: '우코' },
      5: { day: '목', type: '평일', manager: '슬링키' },
      6: { day: '금', type: '평일', manager: '참새' },
      7: { day: '토', type: '휴일', manager: '도리' },
      8: { day: '일', type: '휴일', manager: '참새' },
      9: { day: '월', type: '평일', manager: '도리' },
      10: { day: '화', type: '평일', manager: '오션' },
      11: { day: '수', type: '평일', manager: '수달' },
      12: { day: '목', type: '평일', manager: '우코' },
      13: { day: '금', type: '평일', manager: '슬링키' },
      14: { day: '토', type: '휴일', manager: '오션' },
      15: { day: '일', type: '휴일', manager: '수달' },
      16: { day: '월', type: '평일', manager: '참새' },
      17: { day: '화', type: '평일', manager: '도리' },
      18: { day: '수', type: '평일', manager: '오션' },
      19: { day: '목', type: '평일', manager: '수달' },
      20: { day: '금', type: '평일', manager: '우코' },
      21: { day: '토', type: '휴일', manager: '슬링키' },
      22: { day: '일', type: '휴일', manager: '우코' },
      23: { day: '월', type: '평일', manager: '슬링키' },
      24: { day: '화', type: '평일', manager: '참새' },
      25: { day: '수', type: '평일', manager: '도리' },
      26: { day: '목', type: '평일', manager: '오션' },
      27: { day: '금', type: '평일', manager: '수달' },
      28: { day: '토', type: '휴일', manager: '참새' },
    };

    const emergencyWorkersList = new EmergencyWorkersList(
      WEEKDAYS_WORKERS_LIST,
      DAYOFFWORKERSLIST,
      MONTH_INFO,
    );

    expect(emergencyWorkersList.assignEmergencyWorkerList()).toEqual(EXPECTED_RESULT);
  });
});

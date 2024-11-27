import { validateAssignmentInfor, validateWorkerList } from '../src/utils/validation';

describe('입력 예외 테스트', () => {
  test.each(['13,월', '5,tn'])('비상 근무 배정 입력 예외 테스트', (INPUT) => {
    expect(() => validateAssignmentInfor(INPUT)).toThrow('[ERROR]');
  });

  test.each(['오션,수달,', '오션,오션'])(
    '날짜별로 평일 또는 휴일인지 할당한 월 정보를 얻을 수 있다.',
    (INPUT) => {
      expect(() => validateWorkerList(INPUT)).toThrow('[ERROR]');
    },
  );
});

import { validateWokerList, validateDate } from '../src/utils/validation.js';
import { ERROR_MESSAGE } from '../src/constants/message.js';

describe('배정할 월과 날짜 입력 예외 테스트', () => {
  test.each(['13,월', 'ㄴㅇㄹ', '0,토', '12,달'])(
    '배정할 월과 날짜 입력이 %s 인 경우 에러가 발생한다.',
    (input) => {
      expect(() => validateDate(input)).toThrow(ERROR_MESSAGE.INPUT);
    },
  );
});

describe('근무자 입력 예외 테스트', () => {
  test.each(['**', '참새,도리,참새', '참새,'])(
    '근무자 입력 %s 인 경우 에러가 발생한다.',
    (input) => {
      expect(() => validateWokerList(input)).toThrow(ERROR_MESSAGE.INPUT);
    },
  );
});

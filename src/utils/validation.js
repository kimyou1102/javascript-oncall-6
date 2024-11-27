export const validateAssignmentInfor = (input) => {
  validateSpecialSymbol(input);
  const [month, day] = input.split(',');
  checkMonthRange(month);
  checkDay(day);
};

const validateSpecialSymbol = (input) => {
  const regex = /[^,ㄱ-ㅎ가-힣1-9]/;
  if (regex.test(input)) {
    throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
};

const checkMonthRange = (month) => {
  if (month < 1 || month > 12) {
    throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
};
const checkDay = (day) => {
  const week = ['월', '화', '수', '목', '금', '토', '일'];

  if (!week.includes(day)) {
    throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
};

export const validateWorkerList = (input) => {
  validateWorkerListSpecialSymbol(input);
  const list = input.split(',');
  validateDuplication(list);
  validateNameLength(list);
};

const validateDuplication = (carNames) => {
  const unique = new Set(carNames);
  if (unique.size !== carNames.length) {
    throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
};

const validateWorkerListSpecialSymbol = (input) => {
  const regex = /[^,ㄱ-ㅎ가-힣1-9]/;
  if (regex.test(input)) {
    throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
  }
};

const validateNameLength = (names) => {
  for (let i = 0; i < names.length; i++) {
    if (names[i].length < 1) {
      throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
    }
  }
};

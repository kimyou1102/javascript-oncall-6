import { ERROR_MESSAGE } from '../constants/message.js';
import { createError } from './createError.js';
import { defaultWeek } from '../constants/dayInfo.js';

export const validateDate = (dateInput) => {
  checkDateForm(dateInput);
  const [month, day] = dateInput.split(',');
  checkMonth(month);
  checkDay(day);
};

export const validateWokerList = (listInput) => {
  checkWorkerListForm(listInput);
  const list = listInput.split(',');
  list.forEach((item) => checkItemEmpty(item));
  checkDuplication(list);
};

const checkDateForm = (input) => {
  if (input.replace(/[^,\w\s가-힣]/g, '').length !== input.length) {
    createError(ERROR_MESSAGE.INPUT);
  }
};

const checkMonth = (month) => {
  if (isNaN(month)) {
    createError(ERROR_MESSAGE.INPUT);
  }
  if (month < 1 || month > 12) {
    createError(ERROR_MESSAGE.INPUT);
  }
};

const checkDay = (day) => {
  if (!defaultWeek.includes(day)) {
    createError(ERROR_MESSAGE.INPUT);
  }
};

const checkWorkerListForm = (input) => {
  if (input.replace(/[^,a-zA-Zㄱ-ㅎ가-힣]/g, '').length !== input.length) {
    createError(ERROR_MESSAGE.INPUT);
  }
};

const checkDuplication = (menus) => {
  if (menus.length !== new Set(menus).size) {
    createError(ERROR_MESSAGE.INPUT);
  }
};

const checkItemEmpty = (product) => {
  if (product === '') {
    createError(ERROR_MESSAGE.INPUT);
  }
};

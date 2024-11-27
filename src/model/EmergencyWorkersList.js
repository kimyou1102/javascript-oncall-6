export default class EmergencyWorkersList {
  constructor(weekdaysWorkersList, dayOffWorkersList, monthInfo) {
    this.weekdaysWorkersList = weekdaysWorkersList;
    this.dayOffWorkersList = dayOffWorkersList;
    this.monthInfo = monthInfo;
    this.previousIndex = 0;
  }

  // eslint-disable-next-line max-lines-per-function
  assignEmergencyWorkerList() {
    const emergencyWorkerList = this.copyMonthInfo();
    let weekdaysIndex = 0;
    let dayOffIndex = 0;
    for (const [date, dateInfo] of Object.entries(this.monthInfo)) {
      const beforeInfo = emergencyWorkerList[Number(date) - 1];
      if (dateInfo.type === '평일') {
        this.assignWeekdays(beforeInfo, emergencyWorkerList, date, weekdaysIndex);
        weekdaysIndex += 1;
      }
      if (dateInfo.type === '휴일') {
        this.assignDayOff(beforeInfo, emergencyWorkerList, date, dayOffIndex);
        dayOffIndex += 1;
      }
    }
    return emergencyWorkerList;
  }

  // eslint-disable-next-line max-lines-per-function
  assignWeekdays(beforeInfo, emergencyWorkerList, date, weekdaysIndex) {
    let index = this.getIndex(weekdaysIndex);
    if (this.isChangeOrder(beforeInfo, '휴일', this.weekdaysWorkersList, weekdaysIndex)) {
      this.previousIndex = weekdaysIndex;
      index = weekdaysIndex + 1;
    }
    emergencyWorkerList[date] = {
      ...emergencyWorkerList[date],
      manager: this.weekdaysWorkersList[index % this.weekdaysWorkersList.length],
    };
  }

  // eslint-disable-next-line max-lines-per-function
  assignDayOff(beforeInfo, emergencyWorkerList, date, dayOffIndex) {
    let index = this.getIndex(dayOffIndex);
    if (this.isChangeOrder(beforeInfo, '평일', this.dayOffWorkersList, dayOffIndex)) {
      this.previousIndex = dayOffIndex;
      index = dayOffIndex + 1;
    }
    emergencyWorkerList[date] = {
      ...emergencyWorkerList[date],
      manager: this.dayOffWorkersList[index % this.dayOffWorkersList.length],
    };
  }

  getIndex(workersListIndex) {
    let index = workersListIndex;
    if (this.previousIndex !== 0) {
      index = this.previousIndex;
      this.previousIndex = 0;
    }
    return index;
  }

  copyMonthInfo() {
    const copyMonthInfo = {};
    for (const [date, dateInfo] of Object.entries(this.monthInfo)) {
      copyMonthInfo[date] = { ...dateInfo };
    }
    return copyMonthInfo;
  }

  isChangeOrder(beforeInfo, type, workersList, workersListIndex) {
    if (
      beforeInfo &&
      beforeInfo.type === type &&
      beforeInfo.manager === workersList[workersListIndex % workersList.length]
    ) {
      return true;
    }
    return false;
  }
}

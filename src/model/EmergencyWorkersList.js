export default class EmergencyWorkersList {
  constructor(weekdaysWorkersList, dayOffWorkersList, monthInfo) {
    this.weekdaysWorkersList = weekdaysWorkersList;
    this.dayOffWorkersList = dayOffWorkersList;
    this.monthInfo = monthInfo;
  }

  // eslint-disable-next-line max-lines-per-function
  assignEmergencyWorkerList() {
    const emergencyWorkerList = {};
    let weekdaysIndex = 0;
    let dayOffIndex = 0;
    for (const [date, dateInfo] of Object.entries(this.monthInfo)) {
      emergencyWorkerList[date] = { ...dateInfo };
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

  assignWeekdays(beforeInfo, emergencyWorkerList, date, weekdaysIndex) {
    const weekdaysWorkersListLength = this.weekdaysWorkersList.length;
    let isChange = false;
    if (this.isChangeOrder(beforeInfo, '휴일', this.weekdaysWorkersList, weekdaysIndex)) {
      this.changeOrder(this.weekdaysWorkersList, weekdaysIndex);
      isChange = true;
    }
    emergencyWorkerList[date] = {
      ...emergencyWorkerList[date],
      manager: this.weekdaysWorkersList[weekdaysIndex % weekdaysWorkersListLength],
    };
    if (isChange) {
      this.changeOrder(this.weekdaysWorkersList, weekdaysIndex);
    }
  }

  assignDayOff(beforeInfo, emergencyWorkerList, date, dayOffIndex) {
    const dayOffWorkersListLength = this.dayOffWorkersList.length;
    let isChange = false;
    if (this.isChangeOrder(beforeInfo, '평일', this.dayOffWorkersList, dayOffIndex)) {
      this.changeOrder(this.dayOffWorkersList, dayOffIndex);
      isChange = true;
    }
    emergencyWorkerList[date] = {
      ...emergencyWorkerList[date],
      manager: this.dayOffWorkersList[dayOffIndex % dayOffWorkersListLength],
    };
    if (isChange) {
      this.changeOrder(this.dayOffWorkersList, dayOffIndex);
    }
  }

  changeOrder(workersList, workersListIndex) {
    const workersListLength = workersList.length;
    let temp = workersList[workersListIndex % workersListLength];
    workersList[workersListIndex % workersListLength] =
      workersList[(workersListIndex + 1) % workersListLength];
    workersList[(workersListIndex + 1) % workersListLength] = temp;
  }

  changeOrder2(workersList, workersListIndex) {
    const workersListLength = workersList.length;
    let temp = workersList[workersListIndex % workersListLength];
    workersList[workersListIndex % workersListLength] =
      workersList[(workersListIndex + 1) % workersListLength];
    workersList[(workersListIndex + 1) % workersListLength] = temp;
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

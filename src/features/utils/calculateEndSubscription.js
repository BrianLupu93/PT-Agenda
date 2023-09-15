import dayjs from 'dayjs';

export default (startDate, trainingDays) => {
  let endDate;
  let endDay;
  let endMonth;
  let endYear;

  const start = new Date(
    parseInt(startDate.slice(0, 4)),
    parseInt(startDate.slice(5, 7)) - 1,
    parseInt(startDate.slice(8, 10))
  );

  if (trainingDays === '12' || trainingDays === '16') {
    endDate = dayjs(start).add(4, 'weeks');
    endDay = endDate.date();
    endMonth = endDate.month();
    endYear = endDate.year();
  }

  if (trainingDays === '36' || trainingDays === '48') {
    endDate = dayjs(start).add(12, 'weeks');
    endDay = endDate.date();
    endMonth = endDate.month();
    endYear = endDate.year();
  }

  let newDay;
  let newMonth;

  if (endDay > 0 && endDay < 10) {
    newDay = `0${endDay}`;
  } else if (endDay >= 10) {
    newDay = `${endDay}`;
  }

  if (endMonth === 0) {
    newMonth = '01';
  } else if (endMonth > 0 && endMonth < 9) {
    newMonth = `0${endMonth + 1}`;
  } else if (endMonth >= 9) {
    newMonth = `${endMonth + 1}`;
  }

  return `${newDay}/${newMonth}/${endYear}`;
};

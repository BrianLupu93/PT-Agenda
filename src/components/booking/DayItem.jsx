import { useSelector } from 'react-redux';

const DayItem = ({
  day,
  extraClass,
  handleSelectDay,
  disabled,
  currentMonth,
  currentYear,
}) => {
  const bookingsAmount = useSelector((state) => state.booking.bookingsAmount);

  const formatDate = (dayP, currentMonthP, currentYearP) => {
    let newDay;
    let month;
    const year = currentYearP;

    if (dayP > 0 && dayP < 10) {
      newDay = `0${dayP}`;
    } else if (dayP >= 10) {
      newDay = `${dayP}`;
    }

    if (currentMonthP === 0) {
      month = '01';
    } else if (currentMonthP > 0 && currentMonthP < 9) {
      month = `0${currentMonthP + 1}`;
    } else if (currentMonthP >= 9) {
      month = `${currentMonthP + 1}`;
    }

    return `${newDay}/${month}/${year}`;
  };

  const loadBookingAmount = () => {
    let count = 0;
    bookingsAmount.map((booking) => {
      if (booking.day === formatDate(day, currentMonth, currentYear)) {
        return (count = booking.count);
      }
    });
    return count;
  };

  return (
    <button
      disabled={disabled}
      onClick={() => handleSelectDay(day)}
      className={`flex flex-col justify-center items-center p-4 shadow rounded-sm bg-white w-full h-20 focus:bg-zinc-500 focus:text-white hover:bg-zinc-300 ${extraClass} `}>
      <div className='text-xl mb-2'>{day}</div>
      {!disabled && (
        <div className='text-rose-500 text-sm'>{loadBookingAmount()}</div>
      )}
    </button>
  );
};

export default DayItem;

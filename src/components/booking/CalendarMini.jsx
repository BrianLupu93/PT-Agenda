import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { months } from '../../data/dataVariables';
import DayItemMini from './DayItemMini';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBookingDay,
  removeBookingDay,
} from '../../features/booking/bookingSlice';
import { toast } from 'react-hot-toast';

const CalendarMini = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);

  const monthsNames = months;

  // -------- DAYS ---------
  const [currentDay, setCurrentDay] = useState(dayjs());
  const today = dayjs().format('DD/MM/YYYY');
  const currentMonthDays = currentDay.daysInMonth();
  const daysInMonthArray = [...Array(currentMonthDays).keys()];

  // -------- MONTHS ---------
  const currentMonth = currentDay.month();

  // -------- YEARS ---------
  const currentYear = currentDay.year();

  // -------- CHANGE MONTH ---------
  const handleMonth = useCallback(
    (operation) => {
      if (operation === 'increment') {
        setCurrentDay((prev) => prev.add(1, 'month'));
      }
      if (operation === 'decrement') {
        setCurrentDay((prev) => prev.subtract(1, 'month'));
      }
    },
    [currentDay]
  );

  // -------- CHANGE YEAR ---------
  const handleYear = useCallback(
    (operation) => {
      if (operation === 'increment') {
        setCurrentDay((prev) => prev.add(1, 'year'));
      }
      if (operation === 'decrement') {
        setCurrentDay((prev) => prev.subtract(1, 'year'));
      }
    },
    [currentDay]
  );

  // -------- SELECT DAY ---------
  // -----------------------------
  const handleSelectDay = (day) => {
    const newSelectedDay = dayjs()
      .set('date', day)
      .set('month', currentMonth)
      .set('year', currentYear)
      .format('DD/MM/YYYY');
    if (booking.time === '') {
      toast.error('Selecteaza intervalul orar inainte de a selecta data');
      return;
    } else {
      const daysArray = [];
      booking.bookingDays.map((date) => daysArray.push(date.day));
      if (daysArray.includes(newSelectedDay)) {
        dispatch(removeBookingDay(newSelectedDay));
      } else {
        dispatch(
          addBookingDay({
            day: newSelectedDay,
            time: booking.time,
          })
        );
      }
    }
  };

  // -------- STYLE FOR THE CURRENT DATE DAY ---------
  const squareCurrentDay = (day, currentMonth, currentYear) => {
    let newDay;
    let month;
    const year = currentYear.toString();

    if (day > 0 && day < 10) {
      newDay = `0${day}`;
    } else if (day >= 10) {
      newDay = `${day}`;
    }

    if (currentMonth === 0) {
      month = '01';
    } else if (currentMonth > 0 && currentMonth < 9) {
      month = `0${currentMonth + 1}`;
    } else if (currentMonth >= 9) {
      month = `${currentMonth + 1}`;
    }

    if (
      newDay === today.slice(0, 2) &&
      month === today.slice(3, 5) &&
      year === today.slice(6, 10)
    ) {
      return true;
    }
    return false;
  };

  // -------- STYLE BOOKING DAYS---------
  const stylingBookingDay = (day, currentMonth, currentYear) => {
    let newDay;
    let month;
    const year = currentYear.toString();

    if (day > 0 && day < 10) {
      newDay = `0${day}`;
    } else if (day >= 10) {
      newDay = `${day}`;
    }

    if (currentMonth === 0) {
      month = '01';
    } else if (currentMonth > 0 && currentMonth < 9) {
      month = `0${currentMonth + 1}`;
    } else if (currentMonth >= 9) {
      month = `${currentMonth + 1}`;
    }
    const dayFormat = `${newDay}/${month}/${year}`;

    const daysToStyle = [];
    booking.bookingDays.map((date) => daysToStyle.push(date.day));

    if (daysToStyle.includes(dayFormat)) {
      return 'bg-zinc-500 text-white';
    }
  };

  // -------- PREVIOUS MONTH DAYS TO SHOW ---------
  const prevDaysNum =
    currentDay.startOf('month').day() > 0
      ? currentDay.startOf('month').day() - 1
      : 6;

  const prevDaysToShow = [];
  if (prevDaysNum > 0) {
    const prevMonth = currentDay.subtract(1, 'month');
    const prevMonthDays = prevMonth.daysInMonth();
    const prevMonthDaysArray = [...Array(prevMonthDays).keys()];

    [...Array(prevDaysNum).keys()].forEach(() => {
      const num = prevMonthDaysArray.pop() + 1;
      prevDaysToShow.unshift(num);
    });
  }

  // -------- NEXT MONTH DAYS TO SHOW ---------
  const nextDaysNum = 7 - currentDay.endOf('month').day();
  const nextDaysToShow = [];
  if (nextDaysNum > 0) {
    const nextMonth = currentDay.add(1, 'month');
    const nextMonthDays = nextMonth.daysInMonth();
    const nextMonthDaysArray = [...Array(nextMonthDays).keys()];

    [...Array(nextDaysNum).keys()].forEach((el) => {
      nextDaysToShow.push(nextMonthDaysArray[el]);
    });
  }
  // -------- MODAL ---------
  // ------------------------

  return (
    <>
      <div className='flex flex-col md:px-10 px-0 w-full h-full mx-auto'>
        <div className='flex flex-col w-full items-center mb-8'>
          <div className='flex justify-center items-center w-full px-6'>
            <button onClick={() => handleYear('decrement')}>
              <AiOutlineArrowLeft
                size={20}
                className='text-zinc-900 hover:text-rose-500'
              />
            </button>
            <div className='px-4'>{currentYear}</div>

            <button onClick={() => handleYear('increment')}>
              <AiOutlineArrowRight
                size={20}
                className='text-zinc-900 hover:text-rose-500'
              />
            </button>
          </div>

          <div className='flex justify-between items-center w-full px-6'>
            <button onClick={() => handleMonth('decrement')}>
              <BsFillArrowLeftSquareFill
                size={30}
                className='text-zinc-900 hover:text-rose-500'
              />
            </button>
            <div className='text-3xl'>{monthsNames[currentMonth]}</div>

            <button onClick={() => handleMonth('increment')}>
              <BsFillArrowRightSquareFill
                size={30}
                className='text-zinc-900 hover:text-rose-500'
              />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-7 gap-1 text-center pb-2'>
          <div>Lu</div>
          <div>Ma</div>
          <div>Mie</div>
          <div>Joi</div>
          <div>Vin</div>
          <div>Sa</div>
          <div>Du</div>
        </div>

        <div className='grid grid-cols-7 gap-1'>
          {prevDaysToShow.length > 0 &&
            prevDaysToShow.map((el, i) => {
              return (
                <DayItemMini
                  disabled
                  day={el}
                  key={'prev' + i}
                  extraClass='bg-zinc-300 text-zinc-500'
                  handleSelectDay={handleSelectDay}
                />
              );
            })}

          {daysInMonthArray.map((day, i) => {
            return (
              <DayItemMini
                day={day + 1}
                totalDayBookings={0}
                key={'current' + i}
                extraClass={`
                ${stylingBookingDay(day + 1, currentMonth, currentYear)}
                ${
                  squareCurrentDay(day + 1, currentMonth, currentYear)
                    ? 'border-2 border-blue-600'
                    : ''
                }
                `}
                handleSelectDay={handleSelectDay}
              />
            );
          })}

          {nextDaysToShow.length > 0 &&
            nextDaysToShow.map((el, i) => {
              return (
                <DayItemMini
                  disabled
                  day={el + 1}
                  key={'next' + i}
                  extraClass='bg-zinc-300 text-zinc-500'
                  handleSelectDay={handleSelectDay}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CalendarMini;

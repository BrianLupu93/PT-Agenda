import DayItem from "./DayItem";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

import Button from "../Utils/Button";
import Modal from "../Utils/modal/Modal";

import { months } from "../../data/dataVariables";

import BookingModalBody from "../Utils/modal/BookingModalBody";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "../../features/app/appSlice";
import {
  closeModal,
  openModal,
  setFrom,
} from "../../features/modal/confirmModalSlice";
import {
  createBooking,
  getAllBookings,
  resetBookingDays,
  resetTime,
  setTodayBookings,
} from "../../features/booking/bookingSlice";
import { resetSelectedClient } from "../../features/clients/clientsSlice";
import {
  getAllActiveSubscriptions,
  updateSubscription,
} from "../../features/subscription/subscriptionSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state) => state.subscription.subscriptions
  );
  const selectedDay = useSelector((state) => state.app.selectedDay);
  const confirmModal = useSelector((state) => state.modal);
  const bookingDays = useSelector((state) => state.booking.bookingDays);
  const selectedSubscription = useSelector(
    (state) => state.subscription.selectedSubscription
  );
  const monthsNames = months;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // -------- DAYS ---------
  const [currentDay, setCurrentDay] = useState(dayjs());
  const today = dayjs().format("DD/MM/YYYY");
  const currentMonthDays = currentDay.daysInMonth();
  const daysInMonthArray = [...Array(currentMonthDays).keys()];

  // -------- MONTHS ---------
  const currentMonth = currentDay.month();

  // -------- YEARS ---------
  const currentYear = currentDay.year();

  // -------- SELECTED DAY ---------
  useEffect(() => {
    dispatch(setSelectedDay(today));
  }, []);

  // -------- CHANGE MONTH ---------
  const handleMonth = useCallback(
    (operation) => {
      if (operation === "increment") {
        setCurrentDay((prev) => prev.add(1, "month"));
      }
      if (operation === "decrement") {
        setCurrentDay((prev) => prev.subtract(1, "month"));
      }
    },
    [currentDay]
  );

  // -------- CHANGE YEAR ---------
  const handleYear = useCallback(
    (operation) => {
      if (operation === "increment") {
        setCurrentDay((prev) => prev.add(1, "year"));
      }
      if (operation === "decrement") {
        setCurrentDay((prev) => prev.subtract(1, "year"));
      }
    },
    [currentDay]
  );

  // -------- SELECT DAY ---------
  const handleSelectDay = useCallback(
    (day) => {
      const newSelectedDay = dayjs()
        .set("date", day)
        .set("month", currentMonth)
        .set("year", currentYear)
        .format("DD/MM/YYYY");

      dispatch(setSelectedDay(newSelectedDay));
      dispatch(setTodayBookings(newSelectedDay));
    },
    [currentDay]
  );

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
      month = "01";
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

  // -------- PREVIOUS MONTH DAYS TO SHOW ---------
  const prevDaysNum =
    currentDay.startOf("month").day() > 0
      ? currentDay.startOf("month").day() - 1
      : 6;

  const prevDaysToShow = [];
  if (prevDaysNum > 0) {
    const prevMonth = currentDay.subtract(1, "month");
    const prevMonthDays = prevMonth.daysInMonth();
    const prevMonthDaysArray = [...Array(prevMonthDays).keys()];

    [...Array(prevDaysNum).keys()].forEach(() => {
      const num = prevMonthDaysArray.pop() + 1;
      prevDaysToShow.unshift(num);
    });
  }

  // -------- NEXT MONTH DAYS TO SHOW ---------
  const nextDaysNum = 7 - currentDay.endOf("month").day();
  const nextDaysToShow = [];
  if (nextDaysNum > 0) {
    const nextMonth = currentDay.add(1, "month");
    const nextMonthDays = nextMonth.daysInMonth();
    const nextMonthDaysArray = [...Array(nextMonthDays).keys()];

    [...Array(nextDaysNum).keys()].forEach((el) => {
      nextDaysToShow.push(nextMonthDaysArray[el]);
    });
  }
  // ------------------- MODAL -----------------------
  // -------------------------------------------------

  const onSubmit = async () => {
    const newSubscriptionData = {
      ...selectedSubscription,
      trainingsScheduled:
        selectedSubscription.trainingsScheduled + bookingDays.length,
      trainingsToSchedule:
        selectedSubscription.trainingsToSchedule - bookingDays.length,
      trainingDays: [...selectedSubscription.trainingDays, ...bookingDays],
    };

    await dispatch(
      updateSubscription({
        id: selectedSubscription._id,
        data: newSubscriptionData,
      })
    );
    bookingDays.forEach(async (bookDay) => {
      await dispatch(
        createBooking({
          name: selectedSubscription.name,
          clientId: selectedSubscription.clientId,
          subscriptionId: selectedSubscription._id,
          day: bookDay,
        })
      );
    });
    await dispatch(getAllBookings());
    await dispatch(setTodayBookings(today));
    await dispatch(closeModal());
    await dispatch(resetBookingDays());
    await dispatch(resetTime());
    await dispatch(setFrom());
    await dispatch(resetSelectedClient());

    reset();
  };

  const closeBookingModal = () => {
    dispatch(closeModal());
    dispatch(resetBookingDays());
    dispatch(resetTime());
    dispatch(resetSelectedClient());
    dispatch(setFrom());
  };

  const openBookingModal = async () => {
    dispatch(
      openModal({
        from: "addBookings",
        message: "",
        title: "Schedule bookings",
      })
    );
    await dispatch(getAllActiveSubscriptions());
  };

  return (
    <>
      <div className='flex flex-col md:px-10 px-0 w-full h-full mx-auto'>
        <div className='flex flex-col w-full items-center mb-8'>
          <div className='flex justify-center items-center w-full px-6'>
            <button onClick={() => handleYear("decrement")}>
              <AiOutlineArrowLeft
                size={20}
                className='text-zinc-900 hover:text-rose-500'
              />
            </button>
            <div className='px-4'>{currentYear}</div>

            <button onClick={() => handleYear("increment")}>
              <AiOutlineArrowRight
                size={20}
                className='text-zinc-900 hover:text-rose-500'
              />
            </button>
          </div>

          <div className='flex justify-between items-center w-full px-6'>
            <button onClick={() => handleMonth("decrement")}>
              <BsFillArrowLeftSquareFill
                size={30}
                className='text-zinc-900 hover:text-rose-500'
              />
            </button>
            <div className='text-3xl'>{monthsNames[currentMonth]}</div>

            <button onClick={() => handleMonth("increment")}>
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
                <DayItem
                  disabled
                  day={el}
                  key={"prev" + i}
                  extraClass='bg-zinc-300 text-zinc-500'
                />
              );
            })}

          {daysInMonthArray.map((day, i) => {
            return (
              <DayItem
                currentMonth={currentMonth}
                currentYear={currentYear}
                day={day + 1}
                key={"current" + i}
                extraClass={`
                ${
                  (day + 1).toString() === selectedDay[0] + selectedDay[1]
                    ? "bg-zinc-500 text-white"
                    : ""
                }
                ${
                  squareCurrentDay(day + 1, currentMonth, currentYear)
                    ? "border-2 border-blue-600"
                    : ""
                }

                `}
                handleSelectDay={handleSelectDay}
              />
            );
          })}

          {nextDaysToShow.length > 0 &&
            nextDaysToShow.map((el, i) => {
              return (
                <DayItem
                  disabled
                  day={el + 1}
                  key={"next" + i}
                  extraClass='bg-zinc-300 text-zinc-500'
                />
              );
            })}
        </div>
        <Button
          label='Schedule bookings'
          extraClass='mt-10 w-6/12 self-center'
          small
          onClick={openBookingModal}
          disabled={subscriptions ? false : true}
          title='test'
        />
        {subscriptions ? null : (
          <div className='text-xs text-center mt-2'>
            There are not active subscription:
            <br /> To schdule a booking please first add a subscription
          </div>
        )}
      </div>
      {confirmModal.from === "addBookings" && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={closeBookingModal}
          secondaryActionLabel='Back'
          onSubmit={handleSubmit(onSubmit)}
          actionLabel='Confirm'
          onClose={closeBookingModal}
          body={<BookingModalBody register={register} errors={errors} />}
          small
        />
      )}
    </>
  );
};

export default Calendar;

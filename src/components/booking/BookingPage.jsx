import Calendar from './Calendar';
import BookingTable from './BookingTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getAllClients,
  resetClientError,
} from '../../features/clients/clientsSlice';
import {
  getAllBookings,
  resetBookingError,
  setTodayBookings,
} from '../../features/booking/bookingSlice';
import dayjs from 'dayjs';
import { getAllSubscriptions } from '../../features/subscription/subscriptionSlice';

const BookingPage = () => {
  const dispatch = useDispatch();
  const clientError = useSelector((state) => state.client.error);
  const bookingError = useSelector((state) => state.booking.error);
  const today = dayjs().format('DD/MM/YYYY');

  const init = async () => {
    await dispatch(getAllClients());
    await dispatch(getAllBookings());
    await dispatch(getAllSubscriptions());
    await dispatch(setTodayBookings(today));
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (
      clientError === 'Request failed with status code 403' ||
      bookingError === 'Request failed with status code 403'
    ) {
      localStorage.clear();
      dispatch(resetBookingError());
      dispatch(resetClientError());
      dispatch(setLogout());
    }
  }, [bookingError, clientError]);

  return (
    <div className='w-full flex md:flex-row flex-col '>
      <div className='md:w-6/12 w-full md:mb-0 mb-10'>
        <Calendar />
      </div>
      <div className='md:w-6/12 w-full'>
        <BookingTable />
      </div>
    </div>
  );
};

export default BookingPage;

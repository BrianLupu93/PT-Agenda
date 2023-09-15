import Calendar from './Calendar';
import BookingTable from './BookingTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchClients, resetError } from '../../features/clients/clientsSlice';
import { fetchBookingsAmount } from '../../features/booking/bookingSlice';
import { setLogout } from '../../features/auth/authSlice';

const BookingPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.clients.error);

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchBookingsAmount());
  }, []);

  useEffect(() => {
    if (error === 'Request failed with status code 403') {
      localStorage.clear();
      dispatch(resetError());
      dispatch(setLogout());
    }
  }, [error]);

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

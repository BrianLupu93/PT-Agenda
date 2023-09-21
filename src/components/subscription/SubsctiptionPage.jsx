import { useDispatch, useSelector } from 'react-redux';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionsTable from './SubscriptionsTable';
import { useEffect } from 'react';
import { resetClientError } from '../../features/clients/clientsSlice';
import { setLogout } from '../../features/auth/authSlice';
import { resetBookingError } from '../../features/booking/bookingSlice';
import { getAllActiveSubscriptions } from '../../features/subscription/subscriptionSlice';

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state) => state.subscription.subscriptions
  );
  const clientsError = useSelector((state) => state.client.error);
  const bookingsError = useSelector((state) => state.booking.error);

  useEffect(() => {
    dispatch(getAllActiveSubscriptions());
  }, []);

  useEffect(() => {
    if (
      clientsError === 'Request failed with status code 403' ||
      clientsError === 'Request failed with status code 403'
    ) {
      localStorage.clear();
      dispatch(resetBookingError());
      dispatch(resetClientError());
      dispatch(setLogout());
    }
  }, [clientsError, bookingsError]);

  return (
    <div className='h-full md:w-9/12 w-full mx-auto flex flex-col'>
      <div className=' w-full'>
        <SubscriptionForm />
        {subscriptions && (
          <>
            <div className='divider border border-2 mt-2 mb-10 border-zinc-700 shadow rounded-full'></div>
            <SubscriptionsTable />
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;

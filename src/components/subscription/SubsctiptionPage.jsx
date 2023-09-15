import { useDispatch, useSelector } from 'react-redux';
import SubscriptionForm from './SubscriptionForm';
import SubscriptionsTable from './SubscriptionsTable';
import { useEffect } from 'react';
import { fetchClients, resetError } from '../../features/clients/clientsSlice';
import { setLogout } from '../../features/auth/authSlice';

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const error = useSelector((state) => state.clients.error);

  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  useEffect(() => {
    if (error === 'Request failed with status code 403') {
      localStorage.clear();
      dispatch(resetError());
      dispatch(setLogout());
    }
  }, [error]);

  const subscriptions = clients.some(
    (client) => client.subscription.length > 0
  );

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

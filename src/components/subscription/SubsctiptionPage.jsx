import { useDispatch, useSelector } from "react-redux";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionsTable from "./SubscriptionsTable";
import { useEffect } from "react";
import { resetClientError } from "../../features/clients/clientsSlice";
import { setLogout } from "../../features/auth/authSlice";
import { resetBookingError } from "../../features/booking/bookingSlice";
import {
  getAllActiveSubscriptions,
  resetSubscriptionError,
} from "../../features/subscription/subscriptionSlice";

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state) => state.subscription.subscriptions
  );
  const clientsError = useSelector((state) => state.client.error);
  const bookingsError = useSelector((state) => state.booking.error);
  const subscriptionError = useSelector((state) => state.subscription.error);

  const logout = async () => {
    await localStorage.clear();
    await dispatch(resetBookingError());
    await dispatch(resetClientError());
    await dispatch(resetSubscriptionError());
    await dispatch(setLogout());
  };

  useEffect(() => {
    dispatch(getAllActiveSubscriptions());
  }, []);

  useEffect(() => {
    if (
      clientsError === "Request failed with status code 403" ||
      clientsError === "Request failed with status code 403" ||
      subscriptionError === "Request failed with status code 403"
    ) {
      logout();
    }
  }, [clientsError, bookingsError, subscriptionError]);

  return (
    <div className='h-full md:w-9/12 w-full mx-auto flex flex-col'>
      <div className=' w-full'>
        <SubscriptionForm />
        {subscriptions ? (
          <>
            <div className='divider border border-2 mt-2 mb-10 border-zinc-700 shadow rounded-full'></div>
            <SubscriptionsTable />
          </>
        ) : (
          <div className='mt-10 w-full text-center text-xl text-blue-500'>
            There are not any active subscription
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;

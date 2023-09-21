import { configureStore } from '@reduxjs/toolkit';
import confirmModalReducer from './features/modal/confirmModalSlice';
import bookingReducer from './features/booking/bookingSlice';
import appReducer from './features/app/appSlice';
import authReducer from './features/auth/authSlice';
import clientsReducer from './features/clients/clientsSlice';
import incomeReducer from './features/income/incomeSlice';
import subscriptionReducer from './features/subscription/subscriptionSlice';

export const store = configureStore({
  reducer: {
    modal: confirmModalReducer,
    booking: bookingReducer,
    app: appReducer,
    auth: authReducer,
    client: clientsReducer,
    income: incomeReducer,
    subscription: subscriptionReducer,
  },
});

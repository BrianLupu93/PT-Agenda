import { configureStore } from '@reduxjs/toolkit';
import confirmModalReducer from './features/modal/confirmModalSlice';
import bookingReducer from './features/booking/bookingSlice';
import appReducer from './features/app/appSlice';
import authReducer from './features/auth/authSlice';
import clientsSlice from './features/clients/clientsSlice';

export const store = configureStore({
  reducer: {
    modal: confirmModalReducer,
    booking: bookingReducer,
    app: appReducer,
    auth: authReducer,
    clients: clientsSlice,
  },
});

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bookingUrl } from '../api/serverUrl';
import axios from 'axios';

export const fetchBookingsAmount = createAsyncThunk(
  'booking/fetchAmmount',
  async () => {
    const res = await axios.get(`${bookingUrl}/amount`);
    const data = res.data;
    return data;
  }
);

export const fetchTodayBookings = createAsyncThunk(
  'booking/fetchTodayBookings',
  async (day) => {
    const id = day.replaceAll('/', 'Y');
    const res = await axios.get(`${bookingUrl}/${id}`);
    const data = res.data;
    return data;
  }
);

export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async ({ day, id, scheduled, toSchedule }) => {
    await axios.patch(`${bookingUrl}/${id}`, {
      day: day,
      scheduled: scheduled,
      toSchedule: toSchedule,
    });
  }
);
export const updateBooking = createAsyncThunk(
  'booking/updateBooking',
  async ({ id, data }) => {
    await axios.patch(`${bookingUrl}/update/${id}`, data);
  }
);

const initialState = {
  todayBookings: [],
  bookingDays: [],
  bookingsAmount: [],
  bookingToDelete: {},
  time: '',
  trainigOptions: [12, 16, 36, 48],
  prices: [600, 800, 1800, 2400],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBookingDay: (state, action) => {
      state.bookingDays = [...state.bookingDays, action.payload];
    },
    removeBookingDay: (state, action) => {
      state.bookingDays = state.bookingDays.filter(
        (date) => date.day !== action.payload
      );
    },
    resetBookingDays: (state) => {
      state.bookingDays = [];
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    resetTime: (state) => {
      state.time = '';
    },
    setBookingToDelete: (state, action) => {
      state.bookingToDelete = action.payload;
    },
    resetBookingToDelete: (state) => {
      state.bookingToDelete = {};
    },
  },
  extraReducers: (builder) => {
    // fetchBookingAmount
    builder.addCase(fetchBookingsAmount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookingsAmount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookingsAmount = action.payload.data;
    });
    builder.addCase(fetchBookingsAmount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // fetchTodayBookings
    builder.addCase(fetchTodayBookings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodayBookings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todayBookings = action.payload.data;
    });
    builder.addCase(fetchTodayBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  addBookingDay,
  removeBookingDay,
  resetBookingDays,
  setTime,
  resetTime,
  setBookingToDelete,
  resetBookingToDelete,
} = bookingSlice.actions;
export default bookingSlice.reducer;

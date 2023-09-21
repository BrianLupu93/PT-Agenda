import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bookingUrl } from '../api/serverUrl';
import axios from 'axios';

export const getAllBookings = createAsyncThunk(
  'booking/getAllBookings',
  async () => {
    const res = await axios.get(`${bookingUrl}`);
    const data = res.data;
    return data;
  }
);

export const getBooking = createAsyncThunk(
  'bookings/getBooking',
  async (id) => {
    const res = await axios.get(`${bookingUrl}/${id}`);
    const data = await res.data;
    return data;
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookData) => {
    const res = await axios.post(`${bookingUrl}`, bookData);
    const data = await res.data;
    return data;
  }
);

export const updateBooking = createAsyncThunk(
  'booking/updateBooking',
  async ({ id, data }) => {
    await axios.patch(`${bookingUrl}/${id}`, data);
  }
);
export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async (id) => {
    await axios.delete(`${bookingUrl}/${id}`);
  }
);
export const deleteAllBooking = createAsyncThunk(
  'booking/deleteAllBooking',
  async (id) => {
    await axios.delete(`${bookingUrl}/delete-all/${id}`);
  }
);

const initialState = {
  allBookings: [],
  todayBookings: [],
  bookingDays: [],
  selectedBooking: {},
  time: '',
  trainigOptions: [12, 16, 36, 48],
  prices: [600, 800, 1800, 2400],
  error: '',
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
    resetBookingError: (state) => {
      state.error = '';
    },
    setTodayBookings: (state, action) => {
      if (state.allBookings.length === 0) {
        state.todayBookings = [];
      } else {
        state.todayBookings = state.allBookings.filter(
          (book) => book.day.day === action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    // getAllBookings
    builder.addCase(getAllBookings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allBookings = action.payload.data;
    });
    builder.addCase(getAllBookings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // getBooking
    builder.addCase(getBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBooking.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedBooking = action.payload.data;
    });
    builder.addCase(getBooking.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // createBooking
    builder.addCase(createBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBooking.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createBooking.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // updateBooking
    builder.addCase(updateBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBooking.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateBooking.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // deleteBooking
    builder.addCase(deleteBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteBooking.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // deleteAllBooking
    builder.addCase(deleteAllBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAllBooking.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteAllBooking.rejected, (state, action) => {
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
  resetBookingError,
  setTodayBookings,
} = bookingSlice.actions;
export default bookingSlice.reducer;

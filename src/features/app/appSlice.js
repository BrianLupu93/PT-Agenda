import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDay: '',
  page: 'booking',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setSelectedDay, setPage } = appSlice.actions;
export default appSlice.reducer;

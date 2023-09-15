import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  isOpen: false,
  title: '',
  from: '',
};

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState,
  reducers: {
    // openModal: (state) => {
    //   state.isOpen = false;
    // },
    // closeModal: (state) => {
    //   state.isOpen = true;
    // },
    setMessage: (state, message) => {
      state.message = message;
    },
    setTitle: (state, title) => {
      state.title = title;
    },
    setFrom: (state, from) => {
      state.from = from;
    },
    setEmpty: (state) => {
      state.title = '';
      state.message = '';
    },
    openModal: (state, action) => {
      (state.isOpen = true), (state.from = action.payload.from);
      state.message = action.payload.message;
      state.title = action.payload.title;
    },
    closeModal: (state) => {
      (state.isOpen = false), (state.from = '');
      state.message = '';
      state.title = '';
    },
  },
});

export const {
  openModal,
  closeModal,
  setMessage,
  setTitle,
  setFrom,
  setEmpty,
} = confirmModalSlice.actions;

export default confirmModalSlice.reducer;

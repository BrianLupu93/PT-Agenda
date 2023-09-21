import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { incomesUrl } from '../api/serverUrl';

export const getAllIncomes = createAsyncThunk(
  'incomes/getAllIncomes',
  async () => {
    const res = await axios.get(incomesUrl);
    const data = await res.data;
    return data;
  }
);

export const deleteIncome = createAsyncThunk(
  'incomes/deleteIncomes',
  async (id) => {
    await axios.delete(`${incomesUrl}/${id}`);
  }
);

const initialState = {
  isLoading: false,
  error: '',
  incomes: [],
};

export const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAllIncomes
    builder.addCase(getAllIncomes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllIncomes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.incomes = action.payload.data;
    });
    builder.addCase(getAllIncomes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // deleteIncome
    builder.addCase(deleteIncome.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteIncome.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteIncome.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {} = incomeSlice.actions;
export default incomeSlice.reducer;

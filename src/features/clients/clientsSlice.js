import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clientsUrl, incomesUrl } from '../api/serverUrl';

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const res = await axios.get(clientsUrl);
    const data = await res.data;
    return data;
  }
);
export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (clientId) => {
    await axios.delete(`${clientsUrl}/${clientId}`);
  }
);
export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ id, data }) => {
    await axios.patch(`${clientsUrl}/${id}`, data);
  }
);
export const createSubscription = createAsyncThunk(
  'clients/createSubscriptions',
  async ({ id, data }) => {
    await axios.patch(`${clientsUrl}/${id}`, data);
  }
);

export const updateSubscription = createAsyncThunk(
  'clients/updateSubscription',
  async ({ id, data }) => {
    await axios.patch(`${clientsUrl}/subscription/${id}`, data);
  }
);

export const deleteSubscription = createAsyncThunk(
  'clients/deleteSubscription',
  async (clientId) => {
    await axios.delete(`${clientsUrl}/subscription/${clientId}`);
  }
);

export const addIncomes = createAsyncThunk(
  'clients/addIncomes',
  async ({ id, data }) => {
    await axios.post(`${incomesUrl}/${id}`, data);
  }
);

export const getIncomeYears = createAsyncThunk(
  'clients/getIncomeYears',
  async () => {
    const res = await axios.get(incomesUrl);
    const data = await res.data.years;
    return data;
  }
);

export const getIncomeByYear = createAsyncThunk(
  'clients/getIncomeByYear',
  async (id) => {
    const res = await axios.get(`${incomesUrl}/${id}`);
    const data = await res.data.year;
    return data;
  }
);

const initialState = {
  isLoading: false,
  error: '',
  clients: [],
  subscriptions: [],
  selectedClient: {},
  incomeYears: [],
  incomeByYear: {},
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSelectedClient: (state, action) => {
      const findClient = state.clients.find(
        (client) => client._id === action.payload
      );
      state.selectedClient = findClient;
    },
    resetSelectedClient: (state) => {
      state.selectedClient = {};
    },
    resetError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    // fetchClients
    builder.addCase(fetchClients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clients = action.payload.data;
      const subscriptions = state.clients.filter(
        (client) =>
          client.subscription[0] !== undefined || client.subscription.lenght > 0
      );
      state.subscriptions = subscriptions;
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // updateClient
    builder.addCase(updateClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateClient.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // deleteClient
    builder.addCase(deleteClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteClient.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteClient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Create Subscription
    builder.addCase(createSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSubscription.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createSubscription.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // deleteSubscription
    builder.addCase(deleteSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSubscription.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteSubscription.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // Update Subscription
    builder.addCase(updateSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSubscription.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateSubscription.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // addIcomes
    builder.addCase(addIncomes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addIncomes.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addIncomes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // getIncomeYears
    builder.addCase(getIncomeYears.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIncomeYears.fulfilled, (state, action) => {
      state.isLoading = false;
      state.incomeYears = action.payload;
    });
    builder.addCase(getIncomeYears.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // getIncomeByYear
    builder.addCase(getIncomeByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIncomeByYear.fulfilled, (state, action) => {
      state.isLoading = false;
      state.incomeByYear = action.payload;
    });
    builder.addCase(getIncomeByYear.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setSelectedClient, resetSelectedClient, resetError } =
  clientsSlice.actions;
export default clientsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { subscriptionsUrl } from '../api/serverUrl';
import { toast } from 'react-hot-toast';

export const getAllSubscriptions = createAsyncThunk(
  'subscriptions/getAllSubscriptions',
  async () => {
    const res = await axios.get(subscriptionsUrl);
    const data = await res.data;
    return data;
  }
);

export const getAllActiveSubscriptions = createAsyncThunk(
  'subscriptions/getAllActiveSubscriptions',
  async () => {
    const res = await axios.get(`${subscriptionsUrl}/active`);
    const data = await res.data;
    return data;
  }
);

export const getSubscription = createAsyncThunk(
  'subscriptions/getSubscriptions',
  async (id) => {
    const res = await axios.get(`${subscriptionsUrl}/${id}`);
    const data = await res.data;
    return data;
  }
);

export const createSubscription = createAsyncThunk(
  'subscriptions/createSubscription',
  async (data) => {
    const res = await axios.post(`${subscriptionsUrl}`, data);
    return res.data;
  }
);

export const updateSubscription = createAsyncThunk(
  'subscriptions/updateSubscriptions',
  async ({ id, data }) => {
    await axios.patch(`${subscriptionsUrl}/${id}`, data);
  }
);

export const updateExpiredSubscription = createAsyncThunk(
  'subscriptions/updateExpiredSubscriptions',
  async ({ id, data }) => {
    await axios.post(`${subscriptionsUrl}/expired/${id}`, data);
  }
);

export const deleteSubscription = createAsyncThunk(
  'subscriptions/deleteSubscription',
  async (id) => {
    await axios.delete(`${subscriptionsUrl}/${id}`);
  }
);

const initialState = {
  isLoading: false,
  error: '',
  subscriptions: [],
  activeSubscriptions: [],
  selectedSubscription: {},
};

export const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    resetSubscriptionError: (state) => {
      state.error = '';
    },

    setSelectedSubscription: (state, action) => {
      const sub = state.activeSubscriptions.find(
        (sub) => sub.clientId === action.payload
      );
      state.selectedSubscription = sub === undefined ? {} : sub;
    },
    resetSelecetdSubscription: (state) => {
      state.selectedSubscription = {};
    },
  },
  extraReducers: (builder) => {
    // getAllSubscriptions
    builder.addCase(getAllSubscriptions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubscriptions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subscriptions = action.payload.data;
    });
    builder.addCase(getAllSubscriptions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // getAllActiveSubscriptions
    builder.addCase(getAllActiveSubscriptions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllActiveSubscriptions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.activeSubscriptions = action.payload.data;
    });
    builder.addCase(getAllActiveSubscriptions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // getSubscription
    builder.addCase(getSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSubscription.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedSubscription = action.payload.data;
    });
    builder.addCase(getSubscription.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // createSubscription
    builder.addCase(createSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSubscription.fulfilled, (state) => {
      toast.success('Abonamet inregistrat!');
      state.isLoading = false;
    });
    builder.addCase(createSubscription.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Erroare! Te rugam sa incerci din nou.');
      state.error = action.error.message;
    });
    // updateSubscription
    builder.addCase(updateSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSubscription.fulfilled, (state) => {
      toast.success('Abonamentul a fost actualizat!');
      state.isLoading = false;
    });
    builder.addCase(updateSubscription.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Erroare! Te rugam sa incerci din nou.');
      state.error = action.error.message;
    });
    // updateExpiredSubscription
    builder.addCase(updateExpiredSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateExpiredSubscription.fulfilled, (state) => {
      toast.success('Abonamentul a fost reinoit!');
      state.isLoading = false;
    });
    builder.addCase(updateExpiredSubscription.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Erroare! Te rugam sa incerci din nou.');
      state.error = action.error.message;
    });
    // deleteSubscruption
    builder.addCase(deleteSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSubscription.fulfilled, (state) => {
      toast.success('Abonamentul a fost sters.');
      state.isLoading = false;
    });
    builder.addCase(deleteSubscription.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Erroare! Te rugam sa incerci din nou.');
      state.error = action.error.message;
    });
  },
});

export const {
  resetSubscriptionError,
  setSelectedSubscription,
  resetSelecetdSubscription,
} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

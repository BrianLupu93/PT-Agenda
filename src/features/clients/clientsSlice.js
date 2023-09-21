import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clientsUrl } from '../api/serverUrl';
import { toast } from 'react-hot-toast';

export const getAllClients = createAsyncThunk(
  'clients/getAllClietns',
  async () => {
    const res = await axios.get(clientsUrl);
    const data = await res.data;
    return data;
  }
);

export const getClient = createAsyncThunk('clients/getClient', async (id) => {
  const res = await axios.get(`${clientsUrl}/${id}`);
  const data = await res.data;
  return data;
});

export const createClient = createAsyncThunk(
  'clients/createClient',
  async (data) => {
    await axios.post(`${clientsUrl}`, data);
  }
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ id, data }) => {
    await axios.patch(`${clientsUrl}/${id}`, data);
  }
);
export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id) => {
    await axios.delete(`${clientsUrl}/${id}`);
  }
);

const initialState = {
  isLoading: false,
  error: '',
  clients: [],
  selectedClient: {},
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    resetSelectedClient: (state) => {
      state.selectedClient = {};
    },
    resetClientError: (state) => {
      state.error = '';
    },
    setSelectedClient: (state, action) => {
      const client = state.clients.find(
        (client) => client._id === action.payload
      );

      state.selectedClient = client === undefined ? {} : client;
    },
  },
  extraReducers: (builder) => {
    // getAllCLients
    builder.addCase(getAllClients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllClients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clients = action.payload.data;
    });
    builder.addCase(getAllClients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // getClient
    builder.addCase(getClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedClient = action.payload.data;
    });
    builder.addCase(getClient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // createClient
    builder.addCase(createClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createClient.fulfilled, (state) => {
      toast.success('Client nou adaugat.');
      state.isLoading = false;
    });
    builder.addCase(createClient.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Eroare! Te rugam sa incerci din nou.');
      state.error = action.error.message;
    });
    // updateClient
    builder.addCase(updateClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateClient.fulfilled, (state) => {
      toast.success('Date client actualizate.');
      state.isLoading = false;
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Eroare! Te rugam sa incerci din nou.');
      state.error = action.error.message;
    });
    // deleteClient
    builder.addCase(deleteClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteClient.fulfilled, (state) => {
      toast.success('Clientul a fost sters definitiv.');
      state.isLoading = false;
    });
    builder.addCase(deleteClient.rejected, (state, action) => {
      state.isLoading = false;
      toast.error('Eroare! Te rugam sa incerci din nou.');
      state.error = action.error.message;
    });
  },
});

export const { resetSelectedClient, resetClientError, setSelectedClient } =
  clientsSlice.actions;
export default clientsSlice.reducer;

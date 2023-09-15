import { useEffect, useState } from 'react';
import ClientsForm from './ClientsForm';
import ClientsTable from './ClientsTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, resetError } from '../../features/clients/clientsSlice';
import { setLogout } from '../../features/auth/authSlice';

const ClientsPage = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  const error = useSelector((state) => state.clients.error);

  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  useEffect(() => {
    if (error === 'Request failed with status code 403') {
      localStorage.clear();
      dispatch(resetError());
      dispatch(setLogout());
    }
  }, [error]);

  return (
    <div className='h-full md:w-9/12 w-full mx-auto flex flex-col'>
      <div className='w-full md:mb-0 mb-10'>
        <ClientsForm headline='Adauga Client' buttonLabel='Adauga Client' />
        {clients && clients.length > 0 && (
          <>
            <div className='divider border border-2 mt-2 mb-10 border-zinc-700 shadow rounded-full'></div>
            <ClientsTable />
          </>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;

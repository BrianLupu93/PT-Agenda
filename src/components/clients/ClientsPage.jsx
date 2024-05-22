import { useEffect, useState } from "react";
import ClientsForm from "./ClientsForm";
import ClientsTable from "./ClientsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClients,
  resetClientError,
} from "../../features/clients/clientsSlice";
import { setLogout } from "../../features/auth/authSlice";

const ClientsPage = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);
  const clientsError = useSelector((state) => state.client.error);

  const logout = async () => {
    await localStorage.clear();
    await dispatch(resetClientError());
    await dispatch(setLogout());
  };

  useEffect(() => {
    dispatch(getAllClients());
  }, []);

  useEffect(() => {
    if (clientsError === "Request failed with status code 403") {
      logout();
    }
  }, [clientsError]);

  return (
    <div className='h-full md:w-9/12 w-full mx-auto flex flex-col'>
      <div className='w-full md:mb-0 mb-10'>
        <ClientsForm headline='Add Client' buttonLabel='Add Client' />
        {clients !== undefined && clients.length > 0 ? (
          <>
            <div className='divider border border-2 mt-2 mb-10 border-zinc-700 shadow rounded-full'></div>
            <ClientsTable />
          </>
        ) : (
          <div className='mt-10 w-full text-center text-xl text-blue-500'>
            There are no clients
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsPage;

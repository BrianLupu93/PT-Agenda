import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import Modal from '../Utils/modal/Modal';
import { toast } from 'react-hot-toast';
import ClientsForm from './ClientsForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  openModal,
  closeModal,
  setEmpty,
  setFrom,
} from '../../features/modal/confirmModalSlice';

import { paginate } from '../../features/utils/paginate';
import { useEffect, useState } from 'react';
import {
  deleteClient,
  getAllClients,
  resetSelectedClient,
  setSelectedClient,
} from '../../features/clients/clientsSlice';

const ClientsTable = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);
  const confirmModal = useSelector((state) => state.modal);
  const selectedClient = useSelector((state) => state.client.selectedClient);
  // ---------- PAGINATE AND SEARCH -------------
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedClients, setPaginatedClients] = useState(null);
  const [searchClient, setSearchClient] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const clientsPerPage = 10;
  const pagesButtons =
    clients.length % clientsPerPage > 0
      ? parseInt(clients.length / clientsPerPage) + 1
      : clients.length / clientsPerPage;
  // -----------------------------------------------

  useEffect(() => {
    setPaginatedClients(paginate(clients, clientsPerPage, currentPage));
  }, [currentPage, clients]);

  const openUpdateClientModal = (id) => {
    dispatch(
      openModal({
        from: 'updateClient',
        title: 'Modifica date client',
      })
    );
    dispatch(setSelectedClient(id));
  };

  const openDeleteClientModal = (id) => {
    dispatch(
      openModal({
        from: 'deleteClient',
        title: 'Sterge client',
        message:
          'Sunteti sigur ca doriti sa stergeti definitiv clientul? Datele vor fi sterge definitiv!',
      })
    );
    dispatch(setSelectedClient(id));
  };

  const handleDeleteClient = async () => {
    await dispatch(deleteClient(selectedClient._id));
    await dispatch(getAllClients());
    dispatch(setFrom());
    dispatch(closeModal());
    dispatch(setEmpty());
    dispatch(resetSelectedClient());
  };

  const handleSearchClient = (e) => {
    e.target.value === '' ? setSearchClient(false) : setSearchClient(true);
    const input = e.target.value.toLowerCase();
    const matchClients = clients.filter((client) =>
      client.name.toLowerCase().match(input)
    );
    return setSearchResult(matchClients);
  };

  // =========================================================
  // ==================== TABLE ITEM =========================

  const TableItem = ({ extraClass, name, phone, email, clientId }) => {
    return (
      <>
        <tr
          className={`grid md:grid-cols-4 grid-cols-3 grid-flow-col gap-1 py-2 items-center pl-4 ${extraClass}`}>
          <td>{name}</td>
          <td>{phone}</td>
          <td className='text-blue-600 md:block hidden'>{email}</td>
          <td className='flex justify-center'>
            <button onClick={() => openUpdateClientModal(clientId)}>
              <BiSolidEditAlt
                size={20}
                className='text-blue-600 hover:text-black mx-2'
              />
            </button>
            <button onClick={(e) => openDeleteClientModal(clientId)}>
              <MdDeleteForever
                size={24}
                className='text-rose-500 hover:text-black mx-2'
              />
            </button>
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      <div className='flex flex-col md:px-10 px-0 w-full mx-auto'>
        <div className='flex flex-col items-center justify-center mb-10'>
          <div className='text-3xl'>Clienti</div>
        </div>
        <div className='flex justify-center items-center mb-2'>
          <input
            placeholder='Nume Client'
            className='md:w-3/12 w-8/12 border border-rose-500 rounded-md px-2'
            onChange={(e) => handleSearchClient(e)}
          />
          <AiOutlineSearch className='ml-2' size={20} color='black' />
        </div>

        <div>
          <table className='rounded-sm bg-white w-full shadow-md'>
            <thead className='border-b-4'>
              <tr className='grid md:grid-cols-4 grid-cols-3 grid-flow-col gap-1 py-2 font-bold pl-4'>
                <td>Nume</td>
                <td>Telefon</td>
                <td className='md:block hidden'>Email</td>
                <td>Editare</td>
              </tr>
            </thead>
            <tbody>
              {paginatedClients &&
                !searchClient &&
                paginatedClients.map((client, i) => {
                  return (
                    <TableItem
                      name={client.name}
                      phone={client.phone}
                      email={client.email}
                      clientId={client._id}
                      key={i}
                      count={i + 1}
                      extraClass={(i + 1) % 2 !== 0 ? 'bg-zinc-100' : ''}
                    />
                  );
                })}
              {searchClient &&
                searchResult.map((client, i) => {
                  return (
                    <TableItem
                      name={client.name}
                      phone={client.phone}
                      email={client.email}
                      clientId={client._id}
                      key={i}
                      count={i + 1}
                      extraClass={(i + 1) % 2 !== 0 ? 'bg-zinc-100' : ''}
                    />
                  );
                })}
            </tbody>
          </table>
          {!searchClient && (
            <div className='flex flex-wrap w-full mt-4 justify-center text-sm'>
              {pagesButtons > 0 &&
                Array.from(Array(pagesButtons).keys()).map((btn, i) => {
                  return (
                    <button
                      onClick={(e) => {
                        setCurrentPage(i + 1);
                      }}
                      key={i}
                      className={`${
                        currentPage === i + 1 ? 'bg-blue-600' : 'bg-rose-500'
                      } mr-2 h-8 w-8 mb-4 rounded-full text-white focus:bg-blue-600`}>
                      {i + 1}
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      {confirmModal.from === 'deleteClient' && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={() => dispatch(closeModal())}
          secondaryActionLabel='Inapoi'
          onSubmit={handleDeleteClient}
          actionLabel='Confirma'
          onClose={() => dispatch(closeModal())}
          body={confirmModal.message}
          small
        />
      )}
      {confirmModal.from === 'updateClient' && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={() => dispatch(closeModal())}
          secondaryActionLabel='Inapoi'
          actionLabel='Confirma'
          onClose={() => dispatch(closeModal())}
          body={<ClientsForm buttonLabel='Actualizeata' />}
          small
        />
      )}
    </>
  );
};

export default ClientsTable;

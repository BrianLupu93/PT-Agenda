import { BsPlusCircleFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { MdDeleteForever } from 'react-icons/md';
import dayjs from 'dayjs';
import Modal from '../Utils/modal/Modal';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Utils/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  openModal,
  setEmpty,
} from '../../features/modal/confirmModalSlice';
import calculateEndSubscription from '../../features/utils/calculateEndSubscription';
import Select from '../Utils/Select';
import { timeRanges } from '../../data/dataVariables';
import CalendarMini from '../booking/CalendarMini';
import { paginate } from '../../features/utils/paginate';
import {
  addIncomes,
  deleteSubscription,
  fetchClients,
  resetSelectedClient,
  setSelectedClient,
  updateSubscription,
} from '../../features/clients/clientsSlice';
import Button from '../Utils/Button';
import {
  resetBookingDays,
  resetTime,
  setTime,
} from '../../features/booking/bookingSlice';

const SubscriptionsTable = () => {
  const isMobile = window.screen.width <= 420;
  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.modal);
  const clients = useSelector((state) => state.clients.clients);
  const selectedClient = useSelector((state) => state.clients.selectedClient);
  const subscriptions = useSelector((state) => state.clients.subscriptions);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedClients, setPaginatedClients] = useState(null);
  const [searchClient, setSearchClient] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [scheduleTrainings, setScheduleTrainings] = useState(false);
  const booking = useSelector((state) => state.booking);
  const error = useSelector((state) => state.clients.error);
  const clientsPerPage = 10;
  const pagesButtons =
    subscriptions.length % clientsPerPage > 0
      ? parseInt(subscriptions.length / clientsPerPage) + 1
      : subscriptions.length / clientsPerPage;

  useEffect(() => {
    setPaginatedClients(paginate(subscriptions, clientsPerPage, currentPage));
  }, [currentPage, clients]);

  let count = 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Open the Subscription Deatil modal
  const handleViewDetails = (id) => {
    dispatch(
      openModal({ from: 'subscriptionDetail', title: 'Detalii Abonament' })
    );
    dispatch(setSelectedClient(id));
  };
  // Open update subscription modal from mobile
  const openUpdateSubscriptionMobile = () => {
    dispatch(
      openModal({ from: 'updateSubscription', title: 'Reinoire Abonament' })
    );
  };
  // Open update subscription modal form desktop
  const onUpdateSubscription = (id) => {
    dispatch(
      openModal({ from: 'updateSubscription', title: 'Reinoire Abonament' })
    );
    dispatch(setSelectedClient(id));
  };
  // SUBMIT handler for update subscritpion
  const onSubmit = async (data) => {
    const trainingScheduled = booking.bookingDays.length;
    const remainToSchedule =
      selectedClient.subscription[0].trainingsTotal -
      booking.bookingDays.length;
    const startDate = dayjs(data.startDate).format('DD/MM/YYYY');

    const endDate = calculateEndSubscription(
      data.startDate,
      selectedClient.subscription[0].trainingsTotal.toString()
    );
    const subscription = {
      trainingsTotal: selectedClient.subscription[0].trainingsTotal,
      trainingsDone: 0,
      trainingsRemain: selectedClient.subscription[0].trainingsTotal,
      trainingsReBooked: 0,
      trainingsScheduled: trainingScheduled,
      trainingsToSchedule: remainToSchedule,
      startDate: startDate,
      endDate: endDate,
      isActive: true,
      price: selectedClient.subscription[0].price,
      trainingDays: booking.bookingDays,
    };

    const reqData = {
      name: selectedClient.name,
      eamil: selectedClient.email,
      phone: selectedClient.phone,
      subscription: [subscription],
    };

    await dispatch(
      updateSubscription({ id: selectedClient._id, data: reqData })
    );
    if (error !== '') {
      toast.success('Eroare! Te rog sa incerci din nou');
    } else {
      toast.success('Abonament actualizat');
    }
    await dispatch(addIncomes({ id: selectedClient._id, data: reqData }));
    await dispatch(resetBookingDays());
    await dispatch(resetTime());
    await dispatch(resetSelectedClient());
    await dispatch(fetchClients());
    await dispatch(closeModal());
    reset();
    setScheduleTrainings(false);
  };
  // Close modal from desktop and mobile for update subscription modal
  const handleCloseModal = () => {
    dispatch(resetBookingDays());
    dispatch(resetTime());
    dispatch(resetSelectedClient());
    dispatch(closeModal());
    dispatch(setEmpty());
    setScheduleTrainings(false);
  };
  // Close DETAIL modal from mobile
  const handleCloseDetailModal = () => {
    dispatch(resetSelectedClient());
    dispatch(setEmpty());
    dispatch(closeModal());
  };
  // Search by name handler
  const handleSearchClient = (e) => {
    e.target.value === '' ? setSearchClient(false) : setSearchClient(true);
    const input = e.target.value.toLowerCase();
    const matchClients = subscriptions.filter((client) =>
      client.name.toLowerCase().match(input)
    );
    return setSearchResult(matchClients);
  };
  // Open delete subsciption modal

  const openDeleteSubscriptionModal = (id) => {
    dispatch(
      openModal({
        from: 'deleteSubscription',
        title: 'Sterge Abonament',
        message:
          'Sunteti sigur ca doriti sa stergeti definitiv abonamentul? Datele vor fi sterge definitiv!',
      })
    );
    dispatch(setSelectedClient(id));
  };

  const handleCloseDeleteSubscriptionModal = () => {
    dispatch(resetSelectedClient());
    dispatch(closeModal());
    dispatch(setEmpty());
  };

  const handleDeleteSubscription = async () => {
    await dispatch(deleteSubscription(selectedClient._id));
    await dispatch(fetchClients());
    if (error !== '') {
      toast.error(error);
    } else {
      toast.success('Abonament sters');
    }
    dispatch(resetSelectedClient());
    dispatch(setEmpty());
    dispatch(closeModal());
  };

  // =========================================================
  // ==================== TABLE ITEM =========================

  const TableItem = ({
    extraClass,
    name,
    total,
    done,
    remain,
    scheduled,
    reBooked,
    startDate,
    endDate,
    status,
    id,
  }) => {
    const start = Array.from(startDate)
      .filter((el, index) => index !== 6 && index !== 7)
      .join('');
    const end = Array.from(endDate)
      .filter((el, index) => index !== 6 && index !== 7)
      .join('');

    return (
      <tr
        className={`grid md:grid-cols-10 grid-cols-4 grid-flow-col gap-1 py-2 items-center text-center ${extraClass}`}>
        <td>{name}</td>
        <td className='md:block hidden'>{total}</td>
        <td className='md:block hidden'>{done}</td>
        <td>{remain}</td>
        <td className='md:block hidden'>{scheduled}</td>
        <td className='md:block hidden'>{reBooked}</td>
        <td className='md:block hidden'>{start}</td>
        <td className='md:block hidden'>{end}</td>
        <td
          className={
            status === 'ACTIV'
              ? 'text-green-500 font-bold'
              : 'text-rose-500 font-bold'
          }>
          {status}
        </td>
        <td className='flex justify-center'>
          {isMobile ? (
            <button onClick={(e) => handleViewDetails(id, e)}>
              <BsPlusCircleFill
                size={20}
                className='text-blue-600 focus:text-rose-500 mx-2'
              />
            </button>
          ) : (
            <>
              <button onClick={(e) => onUpdateSubscription(id, e)}>
                <RxUpdate
                  size={20}
                  className='text-blue-600 hover:text-rose-500 mx-2'
                />
              </button>
              <button onClick={(e) => openDeleteSubscriptionModal(id)}>
                <MdDeleteForever
                  size={24}
                  className='text-rose-500 hover:text-black mx-2'
                />
              </button>
            </>
          )}
        </td>
      </tr>
    );
  };

  // =============================================================
  // ==================MODAL BODY DETAILS=========================

  const modalBodyDetails = (
    <div className='flex flex-col'>
      <div className='mb-1'>
        <span className='font-bold'>Nume Client:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedClient).length > 0 &&
            selectedClient !== undefined &&
            selectedClient.name}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Total Sedinte:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedClient).length > 0 &&
            selectedClient !== undefined &&
            selectedClient.subscription[0] !== undefined &&
            selectedClient.subscription[0].trainingsTotal}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Sedinte Sustinute:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedClient).length > 0 &&
            selectedClient !== undefined &&
            selectedClient.subscription[0] !== undefined &&
            selectedClient.subscription[0].trainingsDone}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Sedinte Ramase:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedClient).length > 0 &&
            selectedClient !== undefined &&
            selectedClient.subscription[0] !== undefined &&
            selectedClient.subscription[0].trainingsRemain}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Sedinte Alocate:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedClient).length > 0 &&
            selectedClient !== undefined &&
            selectedClient.subscription[0] !== undefined &&
            selectedClient.subscription[0].trainingsScheduled}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Sedinte Amanate:</span>
        <span className='font-bold text-rose-500 ml-2'>
          {Object.keys(selectedClient).length > 0 &&
            selectedClient !== undefined &&
            selectedClient.subscription[0] !== undefined &&
            selectedClient.subscription[0].trainingsReBooked}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Data Start:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedClient).length > 0 &&
            selectedClient !== undefined &&
            selectedClient.subscription[0] !== undefined &&
            selectedClient.subscription[0].startDate}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Data Sfarsit:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedClient).length > 0 &&
            selectedClient !== undefined &&
            selectedClient.subscription[0] !== undefined &&
            selectedClient.subscription[0].endDate}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Status:</span>
        <span
          className={`${
            Object.keys(selectedClient).length > 0 &&
            selectedClient.subscription[0] !== undefined &&
            selectedClient.subscription[0].isActive
              ? 'text-green-500'
              : 'text-rose-500'
          } font-bold ml-2`}>
          {Object.keys(selectedClient).length > 0 &&
          selectedClient.subscription[0] !== undefined &&
          selectedClient.subscription[0].isActive
            ? 'ACTIV'
            : 'Expira Astazi'}
        </span>
      </div>
    </div>
  );

  // =============================================================
  // ==================MODAL BODY UPDATE ACTION ==================

  const modalBodyUpdate = (
    <>
      <div className='w-full flex md:flex-row flex-col'>
        <div className='md:w-1/2 w-full flex flex-col'>
          <div className='mb-1'>
            <span className='font-bold'>CLIENT:</span>
            <span className='text-blue-500 ml-2 font-bold'>
              {Object.keys(selectedClient).length > 0 && selectedClient.name}
            </span>
          </div>
          <div className='mb-1'>
            <span className='font-bold'>Numar Sedinte:</span>
            <span className='text-blue-500 ml-2 font-bold'>
              {Object.keys(selectedClient).length > 0 &&
                selectedClient.subscription[0] !== undefined &&
                selectedClient.subscription[0].trainingsTotal}
            </span>
          </div>
          <div className='mb-1'>
            <span className='font-bold'>Pret:</span>
            <span className='text-blue-500 ml-2 font-bold'>
              {Object.keys(selectedClient).length > 0 &&
                selectedClient.subscription[0] !== undefined &&
                selectedClient.subscription[0].price}
            </span>
          </div>
        </div>
        <div className='md:w-1/2 w-full w-full flex'>
          <Input
            type='date'
            id='startDate'
            label='Data de Start'
            extraClass='py-1 mb-1'
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>

      <div>
        <div className=' w-full flex md:flex-row flex-col md:justify-between items-center'>
          <Button
            label={scheduleTrainings ? 'Doar Abonament' : 'Antrenamente'}
            extraClass='md:w-3/12 w-full '
            small
            onClick={(e) => {
              e.preventDefault();
              setScheduleTrainings(!scheduleTrainings);
            }}
          />
          {scheduleTrainings && (
            <div className=' md:w-6/12 w-full '>
              <Select
                id='time'
                label='Interval Orar'
                options={timeRanges}
                extraClass='py-2 mb-4 flex'
                register={register}
                errors={errors}
                onChangeCapture={(e) => {
                  dispatch(setTime(e.target.value));
                }}
              />
            </div>
          )}
        </div>
        {scheduleTrainings && <CalendarMini />}
        <div className='flex md:flex-row flex-col mt-2 gap-2 justify-center w-full'>
          <div className='w-full text-center text-red-500'>
            Sedinte Programate:
            <span className='font-bold pl-2'>{booking.bookingDays.length}</span>
          </div>
          <div className='w-full text-center text-blue-600'>
            Sedinte Restante:
            <span className='font-bold pl-2'>
              {Object.keys(selectedClient).length > 0 &&
                selectedClient.subscription[0] !== undefined &&
                selectedClient.subscription[0].trainingsTotal -
                  booking.bookingDays.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
  // =============================================================
  // =============================================================
  return (
    <>
      <div className='flex flex-col px-0 w-full mx-auto'>
        <div className='flex flex-col items-center justify-center mb-10'>
          <div className='text-3xl'>Informatii Abonamente</div>
        </div>
        <div className='flex justify-center items-center mb-2'>
          <input
            placeholder='Nume Client'
            className='md:w-3/12 w-8/12 border border-rose-500 rounded-md px-2'
            onChange={(e) => handleSearchClient(e)}
          />
          <AiOutlineSearch className='ml-2' size={20} color='black' />
        </div>
        <div className=''>
          <table className='rounded-sm bg-white w-full shadow-md'>
            <thead className='border-b-4'>
              <tr className='grid md:grid-cols-10 grid-cols-4 grid-flow-col gap-1 py-2 font-bold text-center'>
                <td>Nume</td>
                <td className='md:block hidden'>Total</td>
                <td className='md:block hidden'>Sustinut</td>
                <td>Ramas</td>
                <td className='md:block hidden'>Alocat</td>
                <td className='md:block hidden'>Amanat</td>
                <td className='md:block hidden'>Inceput</td>
                <td className='md:block hidden'>Sfarsit</td>
                <td>Status</td>
                <td>{isMobile ? 'Detalii' : 'Editare'}</td>
              </tr>
            </thead>
            <tbody>
              {paginatedClients &&
                !searchClient &&
                paginatedClients.map((client, i) => {
                  count += 1;
                  const subs = client.subscription[0];

                  return (
                    <TableItem
                      name={client.name}
                      id={client._id}
                      total={subs.trainingsTotal}
                      done={subs.trainingsDone}
                      remain={subs.trainingsRemain}
                      scheduled={subs.trainingsScheduled}
                      reBooked={subs.trainingsReBooked}
                      startDate={subs.startDate}
                      endDate={subs.endDate}
                      status={subs.isActive ? 'ACTIV' : 'Expira Astazi'}
                      key={i}
                      extraClass={count % 2 !== 0 ? 'bg-zinc-100' : ''}
                    />
                  );
                })}
              {searchClient &&
                searchResult?.map((client, i) => {
                  count += 1;
                  const subs = client.subscription[0];
                  return (
                    <TableItem
                      name={client.name}
                      id={client._id}
                      total={subs.trainingsTotal}
                      done={subs.trainingsDone}
                      remain={subs.trainingsRemain}
                      scheduled={subs.trainingsScheduled}
                      reBooked={subs.trainingsReBooked}
                      startDate={subs.startDate}
                      endDate={subs.endDate}
                      status={subs.isActive ? 'ACTIV' : 'Expira Astazi'}
                      key={i}
                      extraClass={count % 2 !== 0 ? 'bg-zinc-100' : ''}
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
      {confirmModal.from === 'subscriptionDetail' && isMobile && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={handleCloseDetailModal}
          secondaryActionLabel='Inapoi'
          onSubmit={openUpdateSubscriptionMobile}
          actionLabel='Reinoieste'
          onClose={handleCloseDetailModal}
          body={modalBodyDetails}
          small
        />
      )}
      {confirmModal.from === 'updateSubscription' && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={handleCloseModal}
          secondaryActionLabel='Inapoi'
          onSubmit={handleSubmit(onSubmit)}
          actionLabel='Reinoieste'
          onClose={handleCloseModal}
          body={modalBodyUpdate}
          small
        />
      )}
      {confirmModal.from === 'deleteSubscription' && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={handleCloseDeleteSubscriptionModal}
          secondaryActionLabel='Inapoi'
          onSubmit={handleDeleteSubscription}
          actionLabel='Confirma'
          onClose={handleCloseDeleteSubscriptionModal}
          body={confirmModal.message}
          small
        />
      )}
    </>
  );
};

export default SubscriptionsTable;

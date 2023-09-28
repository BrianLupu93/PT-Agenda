import { BsPlusCircleFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { MdDeleteForever } from 'react-icons/md';
import dayjs from 'dayjs';
import Modal from '../Utils/modal/Modal';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Utils/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  openModal,
  setEmpty,
  setFrom,
} from '../../features/modal/confirmModalSlice';
import calculateEndSubscription from '../../features/utils/calculateEndSubscription';
import Select from '../Utils/Select';
import { timeRanges } from '../../data/dataVariables';
import CalendarMini from '../booking/CalendarMini';
import { paginate } from '../../features/utils/paginate';
import Button from '../Utils/Button';
import {
  createBooking,
  deleteAllBooking,
  resetBookingDays,
  resetTime,
  setTime,
} from '../../features/booking/bookingSlice';
import {
  deleteSubscription,
  getAllActiveSubscriptions,
  resetSelecetdSubscription,
  setSelectedSubscription,
  updateExpiredSubscription,
  updateSubscription,
} from '../../features/subscription/subscriptionSlice';

const SubscriptionsTable = () => {
  const isMobile = window.screen.width <= 420;
  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.modal);
  const selectedSubscription = useSelector(
    (state) => state.subscription.selectedSubscription
  );
  const subscriptions = useSelector(
    (state) => state.subscription.activeSubscriptions
  );
  const booking = useSelector((state) => state.booking);

  // -------------- PAGINATE AND SEARCH --------------
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedClients, setPaginatedClients] = useState(null);
  const [searchClient, setSearchClient] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [scheduleTrainings, setScheduleTrainings] = useState(false);
  const clientsPerPage = 10;
  const [pagesButtons, setPagesButtons] = useState();

  useEffect(() => {
    if (subscriptions !== undefined) {
      const pages =
        subscriptions.length % clientsPerPage > 0
          ? parseInt(subscriptions.length / clientsPerPage) + 1
          : subscriptions.length / clientsPerPage;
      setPagesButtons(pages);
    }
    return;
  }, [subscriptions]);

  //  -----------------------------------------------------
  useEffect(() => {
    if (subscriptions !== undefined) {
      setPaginatedClients(paginate(subscriptions, clientsPerPage, currentPage));
    }
    return;
  }, [currentPage, subscriptions]);

  let count = 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Open the Subscription Deatil modal
  const handleViewDetails = (id) => {
    dispatch(setSelectedSubscription(id));
    dispatch(
      openModal({ from: 'subscriptionDetail', title: 'Subscription details' })
    );
  };
  // Open update subscription modal from mobile
  const openUpdateSubscriptionMobile = () => {
    dispatch(
      openModal({ from: 'updateSubscription', title: 'Update Subscription' })
    );
  };
  // Open update subscription modal form desktop
  const onUpdateSubscription = (id) => {
    dispatch(setSelectedSubscription(id));
    dispatch(
      openModal({ from: 'updateSubscription', title: 'Refresh subscription' })
    );
  };
  // SUBMIT handler for update subscritpion
  const onSubmit = async (data) => {
    const startDate = dayjs(data.startDate).format('DD/MM/YYYY');

    const endDate = calculateEndSubscription(
      data.startDate,
      selectedSubscription.trainingsTotal.toString()
    );
    const subscriptionData = {
      name: selectedSubscription.name,
      clientId: selectedSubscription.clientId,
      trainingsTotal: selectedSubscription.trainingsTotal,
      trainingsDone: 0,
      trainingsRemain: selectedSubscription.trainingsTotal,
      trainingsReBooked: 0,
      trainingsScheduled: booking.bookingDays.length,
      trainingsToSchedule:
        selectedSubscription.trainingsTotal - booking.bookingDays.length,
      startDate: startDate,
      endDate: endDate,
      isActive: true,
      price: selectedSubscription.price,
      trainingDays: booking.bookingDays,
    };

    await dispatch(
      updateExpiredSubscription({
        id: selectedSubscription._id,
        data: subscriptionData,
      })
    );

    booking.bookingDays.forEach(async (bookDay) => {
      dispatch(
        createBooking({
          name: selectedSubscription.name,
          clientId: selectedSubscription.clientId,
          subscriptionId: selectedSubscription._id,
          day: bookDay,
        })
      );
    });
    await dispatch(getAllActiveSubscriptions());
    await dispatch(resetBookingDays());
    await dispatch(resetTime());
    await dispatch(resetSelecetdSubscription());
    await dispatch(closeModal());
    await dispatch(setFrom(''));
    reset();
    setScheduleTrainings(false);
  };
  // Close modal from desktop and mobile for update subscription modal
  const handleCloseModal = () => {
    dispatch(resetBookingDays());
    dispatch(resetTime());
    dispatch(resetSelecetdSubscription());
    dispatch(closeModal());
    dispatch(setEmpty());
    dispatch(setFrom(''));
    setScheduleTrainings(false);
  };
  // Close DETAIL modal from mobile
  const handleCloseDetailModal = () => {
    dispatch(resetSelecetdSubscription());
    dispatch(setEmpty());
    dispatch(setFrom(''));
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
    dispatch(setSelectedSubscription(id));
    dispatch(
      openModal({
        from: 'deleteSubscription',
        title: 'Delete Subscription',
        message:
          'Are you sure to delete the subscription? All the subscription data will be removed.',
      })
    );
  };

  const handleCloseDeleteSubscriptionModal = () => {
    dispatch(resetSelecetdSubscription());
    dispatch(closeModal());
    dispatch(setEmpty());
    dispatch(setFrom(''));
  };

  const handleDeleteSubscription = async () => {
    await dispatch(deleteSubscription(selectedSubscription._id));
    await dispatch(deleteAllBooking(selectedSubscription._id));
    await dispatch(getAllActiveSubscriptions());
    dispatch(resetSelecetdSubscription());
    dispatch(setEmpty());
    dispatch(closeModal());
    dispatch(setFrom(''));
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
    alertMessage,
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
            alertMessage === 'ACTIV'
              ? 'text-green-500 font-bold text-xs'
              : 'text-rose-500 font-bold text-xs'
          }>
          {alertMessage}
        </td>
        <td className='flex justify-center'>
          {isMobile ? (
            <>
              <button onClick={(e) => handleViewDetails(id)}>
                <BsPlusCircleFill
                  size={20}
                  className='text-blue-600 focus:text-rose-500 mx-2'
                />
              </button>
              <button onClick={(e) => openDeleteSubscriptionModal(id)}>
                <MdDeleteForever
                  size={24}
                  className='text-rose-500 hover:text-black mx-2'
                />
              </button>
            </>
          ) : (
            <>
              <button onClick={(e) => onUpdateSubscription(id)}>
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
        <span className='font-bold'>Client Name:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.name}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Trainings Total:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.trainingsTotal}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Trainings Done:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.trainingsDone}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Training Remain:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.trainingsRemain}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Trainings Booked:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.trainingsScheduled}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Trainings Rescheduled:</span>
        <span className='font-bold text-rose-500 ml-2'>
          {Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.trainingsReBooked}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Start Date:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.startDate}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>End Date:</span>
        <span className='font-bold text-blue-500 ml-2'>
          {Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.endDate}
        </span>
      </div>
      <div className='mb-1'>
        <span className='font-bold'>Status:</span>
        <span
          className={`${
            Object.keys(selectedSubscription).length > 0 &&
            selectedSubscription.isActive
              ? 'text-green-500'
              : 'text-rose-500'
          } font-bold ml-2`}>
          {Object.keys(selectedSubscription).length > 0 &&
          selectedSubscription.isActive
            ? 'ACTIV'
            : 'Expire today'}
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
              {Object.keys(selectedSubscription).length > 0 &&
                selectedSubscription.name}
            </span>
          </div>
          <div className='mb-1'>
            <span className='font-bold'>Taining Total:</span>
            <span className='text-blue-500 ml-2 font-bold'>
              {Object.keys(selectedSubscription).length > 0 &&
                selectedSubscription.trainingsTotal}
            </span>
          </div>
          <div className='mb-1'>
            <span className='font-bold'>Price:</span>
            <span className='text-blue-500 ml-2 font-bold'>
              {Object.keys(selectedSubscription).length > 0 &&
                selectedSubscription.price}
            </span>
          </div>
        </div>
        <div className='md:w-1/2 w-full w-full flex'>
          <Input
            type='date'
            id='startDate'
            label='Start date'
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
            label={scheduleTrainings ? 'Only Subscription' : 'Training days'}
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
                label='Time'
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
            Scheduled Trainings:
            <span className='font-bold pl-2'>{booking.bookingDays.length}</span>
          </div>
          <div className='w-full text-center text-blue-600'>
            Trainings to schedule:
            <span className='font-bold pl-2'>
              {Object.keys(selectedSubscription).length > 0 &&
                selectedSubscription.trainingsTotal -
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
          <div className='text-3xl'>Subscription Info</div>
        </div>
        <div className='flex justify-center items-center mb-2'>
          <input
            placeholder='Client name'
            className='md:w-3/12 w-8/12 border border-rose-500 rounded-md px-2'
            onChange={(e) => handleSearchClient(e)}
          />
          <AiOutlineSearch className='ml-2' size={20} color='black' />
        </div>
        <div className=''>
          <table className='rounded-sm bg-white w-full shadow-md'>
            <thead className='border-b-4'>
              <tr className='grid md:grid-cols-10 grid-cols-4 grid-flow-col gap-1 py-2 font-bold text-center'>
                <td>Name</td>
                <td className='md:block hidden'>Total</td>
                <td className='md:block hidden'>Done</td>
                <td>Remain</td>
                <td className='md:block hidden'>Scheduled</td>
                <td className='md:block hidden'>Rescheduled</td>
                <td className='md:block hidden'>Start</td>
                <td className='md:block hidden'>End</td>
                <td>Status</td>
                <td>{isMobile ? 'Details' : 'Edit'}</td>
              </tr>
            </thead>
            <tbody>
              {subscriptions !== undefined &&
                paginatedClients &&
                !searchClient &&
                paginatedClients.map((subscription, i) => {
                  count += 1;

                  return (
                    <TableItem
                      name={subscription.name}
                      id={subscription.clientId}
                      total={subscription.trainingsTotal}
                      done={subscription.trainingsDone}
                      remain={subscription.trainingsRemain}
                      scheduled={subscription.trainingsScheduled}
                      reBooked={subscription.trainingsReBooked}
                      startDate={subscription.startDate}
                      endDate={subscription.endDate}
                      alertMessage={subscription.alertMessage}
                      key={i}
                      extraClass={count % 2 !== 0 ? 'bg-zinc-100' : ''}
                    />
                  );
                })}
              {subscriptions !== undefined &&
                searchClient &&
                searchResult?.map((subscription, i) => {
                  count += 1;

                  return (
                    <TableItem
                      name={subscription.name}
                      id={subscription.clientId}
                      total={subscription.trainingsTotal}
                      done={subscription.trainingsDone}
                      remain={subscription.trainingsRemain}
                      scheduled={subscription.trainingsScheduled}
                      reBooked={subscription.trainingsReBooked}
                      startDate={subscription.startDate}
                      endDate={subscription.endDate}
                      status={subscription.isActive ? 'ACTIV' : 'Expire today'}
                      key={i}
                      extraClass={count % 2 !== 0 ? 'bg-zinc-100' : ''}
                    />
                  );
                })}
            </tbody>
          </table>
          {!searchClient && (
            <div className='flex flex-wrap w-full mt-4 justify-center text-sm'>
              {subscriptions !== undefined &&
                pagesButtons &&
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
          secondaryActionLabel='Back'
          onSubmit={openUpdateSubscriptionMobile}
          actionLabel='Refresh'
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
          secondaryActionLabel='Back'
          onSubmit={handleSubmit(onSubmit)}
          actionLabel='Refresh'
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
          secondaryActionLabel='Back'
          onSubmit={handleDeleteSubscription}
          actionLabel='Confirm'
          onClose={handleCloseDeleteSubscriptionModal}
          body={confirmModal.message}
          small
        />
      )}
    </>
  );
};

export default SubscriptionsTable;

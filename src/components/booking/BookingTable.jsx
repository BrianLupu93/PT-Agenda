import { BsFillCalendarDateFill } from 'react-icons/bs';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import Modal from '../Utils/modal/Modal';
import { useForm } from 'react-hook-form';
import BookingModalBody from '../Utils/modal/BookingModalBody';
import { useSelector, useDispatch } from 'react-redux';

import {
  setFrom,
  openModal,
  setEmpty,
  closeModal,
} from '../../features/modal/confirmModalSlice';

import {
  deleteBooking,
  getAllBookings,
  resetBookingDays,
  resetTime,
  updateBooking,
  setEditBooking,
  resetEditBooking,
} from '../../features/booking/bookingSlice';
import {
  resetSelectedClient,
  setSelectedClient,
} from '../../features/clients/clientsSlice';
import { getAllActiveSubscriptions } from '../../features/subscription/subscriptionSlice';

const BookingTable = () => {
  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.modal);
  const selectedDay = useSelector((state) => state.app.selectedDay);
  const todayBookings = useSelector((state) => state.booking.todayBookings);
  const selectedBooking = useSelector((state) => state.booking.editBooking);
  const selectedClient = useSelector((state) => state.client.selectedClient);
  const booking = useSelector((state) => state.booking);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ------------------- MODAL -----------------------
  // -------------------------------------------------

  const onDelete = (id) => {
    dispatch(setEditBooking(id));
    dispatch(
      openModal({
        from: 'deleteBooking',
        message:
          'Sunteti sigur ca doriti sa stergeti definitiv programarea? Datele programarii se vor sterge definitiv!',
        title: 'Sterge Programarea',
      })
    );
  };

  const onUpdate = async (id, clientId) => {
    dispatch(setEditBooking(id));
    dispatch(setSelectedClient(clientId));
    dispatch(
      openModal({
        from: 'updateBooking',
        message: '',
        title: 'Reprogrameaza sedinta',
      })
    );
  };

  const onDeleteSubmit = async () => {
    await dispatch(deleteBooking(selectedBooking._id));
    await dispatch(getAllActiveSubscriptions());
    await dispatch(getAllBookings());
    dispatch(resetSelectedClient());
    dispatch(setFrom(''));
    dispatch(setEmpty());
    dispatch(closeModal());
  };

  const onUpdateSubmit = async () => {
    const bookData = {
      name: selectedClient.name,
      clientId: selectedClient._id,
      subscriptionId: selectedBooking.subscriptionId,
      day: booking.bookingDays[0],
    };

    await dispatch(updateBooking({ id: selectedBooking._id, data: bookData }));
    await dispatch(getAllActiveSubscriptions());
    await dispatch(getAllBookings());

    dispatch(resetSelectedClient());
    dispatch(resetBookingDays());
    dispatch(resetEditBooking());
    dispatch(resetTime());
    dispatch(setFrom(''));
    dispatch(setEmpty());
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(resetSelectedClient());
    dispatch(resetTime());
    dispatch(setFrom(''));
    dispatch(setEmpty());
    dispatch(resetBookingDays());
    dispatch(resetEditBooking());
  };

  const handleCloseUpdateModal = () => {
    dispatch(closeModal());
    dispatch(resetSelectedClient());
    dispatch(resetBookingDays());
    dispatch(resetEditBooking());
    dispatch(resetTime());
    dispatch(setFrom(''));
    dispatch(setEmpty());
  };

  // ------------------- TABLE ITEM ---------------------
  // ----------------------------------------------------

  const TableItem = ({
    count,
    status,
    extraClass,
    name,
    time,
    id,
    clientId,
  }) => {
    return (
      <>
        <tr
          className={`grid grid-cols-5 grid-flow-col gap-1 py-2 items-center text-center ${extraClass}`}>
          <td>{count}</td>
          <td>{name}</td>
          <td>{time}</td>
          <td className='flex items-center justify-center'>
            <GrStatusGoodSmall size={20} color={status ? 'red' : 'green'} />
          </td>
          <td className='flex justify-center'>
            <button onClick={() => onUpdate(id, clientId)}>
              <BsFillCalendarDateFill
                size={20}
                className='text-blue-600 hover:text-black mx-2'
              />
            </button>
            <button onClick={() => onDelete(id)}>
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
        <div className='flex flex-col items-center justify-center mb-9'>
          <div className='text-md'>{selectedDay}</div>
          <div className='text-3xl'>Program</div>
        </div>
        <div>
          <table className='rounded-sm bg-white w-full shadow-md'>
            <thead className='border-b-4'>
              <tr className='grid grid-cols-5 grid-flow-col gap-1 py-2 font-bold text-center'>
                <td>Nr.</td>
                <td>Client</td>
                <td>Ora</td>
                <td>Status</td>
                <td>Editare</td>
              </tr>
            </thead>
            {todayBookings.length > 0 && (
              <tbody>
                {todayBookings.map((book, i) => {
                  return (
                    <TableItem
                      name={book.name}
                      time={book.day.time}
                      status={book.day.done}
                      id={book._id}
                      clientId={book.clientId}
                      day={book.day.day}
                      key={i}
                      count={i + 1}
                      extraClass={(i + 1) % 2 !== 0 ? 'bg-zinc-100' : ''}
                    />
                  );
                })}
              </tbody>
            )}
          </table>
          {todayBookings.length === 0 && (
            <div className='mt-10 w-full text-center text-xl text-rose-500'>
              Nu exista sedinte programate pentru data selectata!
            </div>
          )}
        </div>
      </div>
      {confirmModal.from === 'deleteBooking' && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={handleCloseModal}
          secondaryActionLabel='Inapoi'
          onSubmit={onDeleteSubmit}
          actionLabel='Confirma'
          onClose={handleCloseModal}
          body={confirmModal.message}
          small
        />
      )}
      {confirmModal.from === 'updateBooking' && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={handleCloseUpdateModal}
          secondaryActionLabel='Inapoi'
          onSubmit={handleSubmit(onUpdateSubmit)}
          actionLabel='Reprogrameaza'
          small
          onClose={handleCloseUpdateModal}
          body={<BookingModalBody />}
        />
      )}
    </>
  );
};

export default BookingTable;

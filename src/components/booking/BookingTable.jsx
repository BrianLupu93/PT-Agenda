import { BsFillCalendarDateFill } from 'react-icons/bs';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import Modal from '../Utils/modal/Modal';
import { toast } from 'react-hot-toast';
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
  resetBookingDays,
  resetTime,
} from '../../features/booking/bookingSlice';
import { resetSelectedClient } from '../../features/clients/clientsSlice';

const BookingTable = () => {
  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.modal);
  const selectedDay = useSelector((state) => state.app.selectedDay);
  const bookingDays = useSelector((state) => state.booking.bookingDays);
  const todayBookings = useSelector((state) => state.booking.todayBookings);
  const selectedClient = useSelector((state) => state.client.selectedClient);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ------------------- MODAL -----------------------
  // -------------------------------------------------

  const onDelete = (day, id) => {
    dispatch(
      openModal({
        from: 'deleteBooking',
        message:
          'Sunteti sigur ca doriti sa stergeti definitiv programarea? Datele programarii se vor sterge definitiv!',
        title: 'Sterge Programarea',
      })
    );
  };
  const onUpdate = (id, day) => {
    dispatch(
      openModal({
        from: 'updateBooking',
        message: '',
        title: 'Reprogrameaza sedinta',
      })
    );
  };

  const onDeleteSubmit = async () => {
    dispatch(resetSelectedClient());
    dispatch(setFrom(''));
    dispatch(setEmpty());
    dispatch(closeModal());
  };

  const onUpdateSubmit = async () => {
    dispatch(resetSelectedClient());
    dispatch(resetBookingDays());
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
  };

  const handleCloseUpdateModal = () => {
    dispatch(closeModal());
    dispatch(resetSelectedClient());
    dispatch(resetBookingDays());
    dispatch(resetTime());
    dispatch(setFrom(''));
    dispatch(setEmpty());
  };

  // ------------------- TABLE ITEM ---------------------
  // ----------------------------------------------------

  const TableItem = ({ count, status, extraClass, name, time, id, day }) => {
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
            <button onClick={() => onUpdate(id, day)}>
              <BsFillCalendarDateFill
                size={20}
                className='text-blue-600 hover:text-black mx-2'
              />
            </button>
            <button onClick={() => onDelete(day, id)}>
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
          <div className='text-md'>{selectedDay.selectedDay}</div>
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
                      id={book.subscriptionId}
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

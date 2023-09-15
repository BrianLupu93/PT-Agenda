import CalendarMini from '../../booking/CalendarMini';
import { useForm } from 'react-hook-form';
import Select from '../Select';
import { clients, timeRanges } from '../../../data/dataVariables';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedClient } from '../../../features/clients/clientsSlice';
import {
  setTime,
  resetTime,
  resetBookingDays,
} from '../../../features/booking/bookingSlice';

const BookingModalBody = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.subscriptions);
  const booking = useSelector((state) => state.booking);
  const selectedClient = useSelector((state) => state.clients.selectedClient);
  const modalFrom = useSelector((state) => state.modal.from);

  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className='flex flex-col'>
      <div className='flex md:flex-row flex-col gap-4 mb-6'>
        {modalFrom === 'updateBooking' ? (
          <div className='w-full flex items-center justify-center text-2xl text-blue-600'>
            <div>{selectedClient.name}</div>
          </div>
        ) : (
          <Select
            id='client'
            register={register}
            errors={errors}
            required
            label='Client'
            extraClass='py-2 mb-1'
            options={clients.map((client) => {
              return { id: client._id, value: client.name };
            })}
            onChangeCapture={(e) => dispatch(setSelectedClient(e.target.value))}
          />
        )}

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
      <CalendarMini />
      <div className='flex md:flex-row flex-col mt-2 gap-2 justify-center w-full'>
        <div className='w-full text-center text-red-500'>
          Sedinte Programate:
          <span className='font-bold pl-2'>
            {Object.keys(selectedClient).length > 0
              ? selectedClient.subscription[0].trainingsScheduled +
                (booking.bookingDays.length > 0
                  ? booking.bookingDays.length
                  : 0)
              : 0}
          </span>
        </div>
        <div className='w-full text-center text-blue-600'>
          Sedinte Restante:
          <span className='font-bold pl-2'>
            {Object.keys(selectedClient).length > 0
              ? selectedClient.subscription[0].trainingsToSchedule -
                (booking.bookingDays.length > 0
                  ? booking.bookingDays.length
                  : 0)
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingModalBody;

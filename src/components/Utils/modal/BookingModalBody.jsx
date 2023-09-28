import CalendarMini from '../../booking/CalendarMini';
import { useForm } from 'react-hook-form';
import Select from '../Select';
import { timeRanges } from '../../../data/dataVariables';
import { useDispatch, useSelector } from 'react-redux';

import {
  setTime,
  resetTime,
  resetBookingDays,
} from '../../../features/booking/bookingSlice';

import { setSelectedSubscription } from '../../../features/subscription/subscriptionSlice';

const BookingModalBody = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state) => state.subscription.activeSubscriptions
  );
  const booking = useSelector((state) => state.booking);
  const selectedClient = useSelector((state) => state.client.selectedClient);
  const modalFrom = useSelector((state) => state.modal.from);
  const selectedSubscription = useSelector(
    (state) => state.subscription.selectedSubscription
  );

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
            options={
              subscriptions !== undefined &&
              subscriptions.length > 0 &&
              subscriptions.map((subscription) => {
                return { id: subscription.clientId, value: subscription.name };
              })
            }
            onChangeCapture={(e) =>
              dispatch(setSelectedSubscription(e.target.value))
            }
          />
        )}

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
      <CalendarMini />
      <div className='flex md:flex-row flex-col mt-2 gap-2 justify-center w-full'>
        <div className='w-full text-center text-red-500'>
          Scheduled Trainings:
          <span className='font-bold pl-2'>
            {Object.keys(selectedSubscription).length > 0
              ? selectedSubscription.trainingsScheduled +
                (booking.bookingDays.length > 0
                  ? booking.bookingDays.length
                  : 0)
              : 0}
          </span>
        </div>
        <div className='w-full text-center text-blue-600'>
          Trainings to schedule:
          <span className='font-bold pl-2'>
            {Object.keys(selectedSubscription).length > 0
              ? selectedSubscription.trainingsToSchedule -
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

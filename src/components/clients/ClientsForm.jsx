import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Input from '../Utils/Input';
import Button from '../Utils/Button';

import Modal from '../Utils/modal/Modal';
import {
  openModal,
  closeModal,
  setEmpty,
} from '../../features/modal/confirmModalSlice';
import {
  createClient,
  getAllClients,
  resetSelectedClient,
  updateClient,
} from '../../features/clients/clientsSlice';

const ClientsForm = ({ headline, buttonLabel }) => {
  const dispatch = useDispatch();
  const confirmModal = useSelector((state) => state.modal);
  const selectedClient = useSelector((state) => state.client.selectedClient);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const onAddClientSubmit = async (data) => {
    await dispatch(createClient(data));
    await dispatch(getAllClients());
    reset();
    dispatch(closeModal());
    dispatch(setEmpty());
  };

  const openAddClientModal = () => {
    if (confirmModal.from === 'updateClient') {
      toast.success('Date client actualizate');
      dispatch(closeModal());
    } else {
      dispatch(
        openModal({
          from: 'addClient',
          title: 'Adauga Client',
          message:
            ' Datele introduse sunt corecte? Doresti sa confirmi adaugarea clientului nou?',
        })
      );
    }
  };
  const onUpdateClientSubmit = async (data) => {
    await dispatch(updateClient({ id: selectedClient._id, data: data }));
    await dispatch(getAllClients());
    dispatch(resetSelectedClient());
    dispatch(setEmpty());
    dispatch(closeModal());
  };

  return (
    <>
      <div className='flex flex-col md:px-10 px-0 w-full'>
        <div className='flex flex-col w-full items-center mb-8'>
          <div className='text-3xl mb-10'>{headline}</div>
          <div className='flex md:flex-row flex-col text-md gap-2 w-full'>
            <Input
              id='name'
              label='Nume si Prenume'
              type='text'
              extraClass='py-1 mb-1'
              register={register}
              errors={errors}
              required
            />
            <Input
              id='phone'
              label='Telefon'
              type='text'
              extraClass='py-1 mb-1'
              register={register}
              errors={errors}
              required
            />
            <Input
              id='email'
              label='Email'
              type='email'
              extraClass='py-1 mb-1'
              register={register}
              errors={errors}
              required
            />
          </div>

          <div className='w-full mt-4 md:px-0 px-4 text-center'>
            <Button
              label={buttonLabel}
              extraClass='md:w-3/12 w-full'
              small
              onClick={
                confirmModal.from === 'updateClient'
                  ? handleSubmit(onUpdateClientSubmit)
                  : handleSubmit(openAddClientModal)
              }
            />
          </div>
        </div>
      </div>
      {confirmModal.from === 'addClient' && (
        <Modal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          secondaryAction={() => dispatch(closeModal())}
          secondaryActionLabel='Inapoi'
          onSubmit={handleSubmit(onAddClientSubmit)}
          actionLabel='Confirma'
          onClose={() => dispatch(closeModal())}
          body={confirmModal.message}
          small
        />
      )}
    </>
  );
};

export default ClientsForm;

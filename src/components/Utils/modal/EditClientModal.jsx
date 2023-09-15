import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Modal from './Modal';
import ClientsForm from '../../clients/ClientsForm';

const EditClientModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ClientsForm buttonLabel='Actualizeata' />
    </div>
  );

  return (
    <></>
    // <Modal
    //   disabled={isLoading}
    //   isOpen={editClientModal.isOpen}
    //   title='Modifica date client'
    //   secondaryAction={editClientModal.onClose}
    //   secondaryActionLabel='Inapoi'
    //   onClose={editClientModal.onClose}
    //   body={bodyContent}
    //   small
    // />
  );
};

export default EditClientModal;

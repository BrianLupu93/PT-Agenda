import { setPage } from '../../features/app/appSlice';
import Button from '../Utils/Button';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.app.page);

  const handlePage = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className='fixed top-0 flex w-full items-center md:px-20 px-1 py-4 bg-zinc-900 z-[666]'>
      <div className='flex w-full justify-center md:gap-4 gap-2'>
        <div className='md:w-36 w-28'>
          <Button
            bgClass={page === 'booking' ? 'bg-blue-700' : ''}
            borderClass={page === 'booking' ? 'border-blue-700' : ''}
            label='Calendar'
            onClick={() => handlePage('booking')}
            small
          />
        </div>
        <div className='md:w-36 w-28'>
          <Button
            bgClass={page === 'clients' ? 'bg-blue-700' : ''}
            borderClass={page === 'clients' ? 'border-blue-700' : ''}
            label='Clienti'
            onClick={() => handlePage('clients')}
            small
          />
        </div>
        <div className='md:w-36 w-28'>
          <Button
            bgClass={page === 'subscriptions' ? 'bg-blue-700' : ''}
            borderClass={page === 'subscriptions' ? 'border-blue-700' : ''}
            label='Abonamente'
            onClick={() => handlePage('subscriptions')}
            small
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

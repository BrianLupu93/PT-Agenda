import { BiLogOut } from 'react-icons/bi';
import { GiMoneyStack } from 'react-icons/gi';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../features/auth/authSlice';
import { setPage } from '../../features/app/appSlice';

const Footer = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.app.page);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLogout());
    toast.success('Delogare cu succes!');
  };

  return (
    <div className='fixed bottom-0 flex w-full justify-between md:px-20 px-4 py-4 bg-zinc-900'>
      <button
        className={`${
          page === 'incomes' ? 'bg-green-600' : 'bg-white'
        } hover:bg-rose-500 rounded-full p-1`}>
        <GiMoneyStack
          size={24}
          className='text-black'
          onClick={() => dispatch(setPage('incomes'))}
        />
      </button>

      <button className='bg-white hover:bg-rose-500 rounded-full p-1'>
        <BiLogOut size={24} className='text-black' onClick={handleLogout} />
      </button>
    </div>
  );
};

export default Footer;

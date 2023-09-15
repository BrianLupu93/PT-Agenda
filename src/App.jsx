import { useEffect, useState } from 'react';
import Login from './components/pageComponents/Login';
import Page from './components/pageComponents/Page';
import Navbar from './components/pageComponents/Navbar';
import Footer from './components/pageComponents/Footer';
import EditClientModal from './components/Utils/modal/EditClientModal';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth);

  let content = auth.isLoggedIn ? <Page /> : <Login />;

  return (
    <div className=''>
      {auth.isLoggedIn && <Navbar />}
      <Toaster />
      <EditClientModal />
      <div>{content}</div>
      {auth.isLoggedIn && <Footer />}
    </div>
  );
}

export default App;

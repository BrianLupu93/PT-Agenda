import { useSelector } from 'react-redux';
import BookingPage from '../booking/BookingPage';
import ClientsPage from '../clients/ClientsPage';
import SubsctiptionPage from '../subscription/SubsctiptionPage';
import { useEffect, useState } from 'react';
import IncomesPage from '../incomes/IncomesPage';

const Page = () => {
  const page = useSelector((state) => state.app.page);
  const [content, setContent] = useState();

  useEffect(() => {
    const content =
      page === 'booking' ? (
        <BookingPage />
      ) : page === 'clients' ? (
        <ClientsPage />
      ) : page === 'subscriptions' ? (
        <SubsctiptionPage />
      ) : (
        <IncomesPage />
      );

    setContent(content);
  }, [page]);

  return <div className='pt-24 pb-24 md:px-16 px-4 bg-zinc-100'>{content}</div>;
};

export default Page;

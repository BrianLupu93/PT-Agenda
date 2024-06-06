import { useDispatch, useSelector } from "react-redux";
import BookingPage from "../booking/BookingPage";
import ClientsPage from "../clients/ClientsPage";
import SubsctiptionPage from "../subscription/SubsctiptionPage";
import { useEffect, useState } from "react";
import IncomesPage from "../incomes/IncomesPage";
import Button from "../Utils/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authUrl } from "../../features/api/serverUrl";
import { setLogout } from "../../features/auth/authSlice";

const Page = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.app.page);
  const [content, setContent] = useState();

  const handleLogout = () => {
    axios.post(`${authUrl}/logout`, {});
    localStorage.clear();
    dispatch(setLogout());
    navigate("/");
  };

  useEffect(() => {
    const content =
      page === "booking" ? (
        <BookingPage />
      ) : page === "clients" ? (
        <ClientsPage />
      ) : page === "subscriptions" ? (
        <SubsctiptionPage />
      ) : (
        <IncomesPage />
      );

    setContent(content);
  }, [page]);

  return (
    <>
      <div className='pt-28 pb-24 md:px-16 px-4'>{content}</div>;
      <div className='absolute top-12 md:left-24 left-4 w-[180px]'>
        <Button
          outline
          extraClass='mt-6 hover:bg-black hover:text-white focus:bg-white focus:border-rose-500'
          label='Back to Homepage'
          small
          onClick={handleLogout}
        />
      </div>
    </>
  );
};

export default Page;

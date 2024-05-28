import React from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import EditClientModal from "../../components/Utils/modal/EditClientModal";
import Footer from "../../components/pageComponents/Footer";
import Navbar from "../../components/pageComponents/Navbar";
import Login from "../../components/pageComponents/Login";
import Page from "../../components/pageComponents/Page";

const AppHome = () => {
  const auth = useSelector((state) => state.auth);

  let content = auth.isLoggedIn ? <Page /> : <Login />;
  return (
    <>
      {auth.isLoggedIn && <Navbar />}
      <Toaster />
      <EditClientModal />
      <div>{content}</div>
      {auth.isLoggedIn && <Footer />}
    </>
  );
};

export default AppHome;

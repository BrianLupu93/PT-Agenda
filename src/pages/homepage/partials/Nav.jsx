import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Utils/Button";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-[50px] flex items-center sticky top-0 text-blue-500 bg-zinc-950 shadow-lg shadow-rose-500/70 2xl:px-40 md:px-20 px-2'>
      <div className='w-[150px] absolute 2xl:right-40 md:right-20 right-2'>
        <Button
          label='TRY NOW'
          onClick={() => navigate("/pt-agenda")}
          extraClass='animate-pulse'
          small
        />
      </div>
    </div>
  );
};

export default Nav;

import React from "react";
import { CgClose } from "react-icons/cg";
import Button from "../../../components/Utils/Button";
import { useNavigate } from "react-router-dom";

const MobileNav = ({ show, setShow, navLinks }) => {
  const navigate = useNavigate();

  const nav = document.getElementById("#mobileNav");
  const menuBtn = document.getElementById("#menuButton");

  document.addEventListener("click", (e) => {
    !nav?.contains(e.target) || (e.target !== menuBtn && setShow(false));
  });

  return (
    <div
      id='mobileNav'
      className={`md:hidden fixed top-0 transition-all ease-in-out duration-500 ${
        show ? "left-0" : "-left-[300px]"
      } z-50 h-full w-[300px] bg-zinc-950`}
    >
      <div className='flex items-center h-full max-w-[1440px] ml-auto mr-auto xl:px-8 lg:px-6 md:px-6 px-4'>
        <button
          className='px-1 absolute right-8 top-8 text-white'
          onClick={() => setShow(false)}
        >
          <CgClose className='text-white' size={30} />
        </button>

        <div className='flex flex-col justify-center items-center gap-6 w-full mb-40'>
          {navLinks.map((el, i) => {
            return (
              <a
                className='text-white hover:text-yellow-base text-lg'
                key={i}
                href={"#" + el.href}
                onClick={() => {
                  setShow(false);
                }}
              >
                {el.label.toUpperCase()}
              </a>
            );
          })}
        </div>

        <div className='absolute bottom-10 right-[50%] translate-x-[50%] overflow-visibile'>
          <Button
            label='TRY NOW'
            onClick={() => navigate("/pt-agenda")}
            extraClass='animate-pulse w-[200px]'
            small
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

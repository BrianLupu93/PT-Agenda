import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Utils/Button";
import MobileNav from "../partials/MobileNav";
import { IoMenu } from "react-icons/io5";

const Nav = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const navLinks = [
    { label: "About the project", href: "about" },
    { label: "Tech Stack", href: "tech" },
    { label: "Documentation", href: "documentation" },
  ];

  return (
    <>
      <div className='w-full h-[50px] flex items-center sticky top-0 text-blue-500 bg-zinc-950 shadow-lg shadow-rose-500/70 2xl:px-40 md:px-20 px-2 z-20'>
        <div className='lg:w-8/12 md:w-6/12 md:flex hidden gap-6'>
          {navLinks.map((el, i) => {
            return (
              <a
                className='text-white hover:text-rose-500 text-sm focus:text-rose-500 active:scale-[102%]'
                key={i}
                href={"#" + el.href}
              >
                {el.label.toUpperCase()}
              </a>
            );
          })}
        </div>

        <div className='w-[150px] absolute 2xl:right-40 md:right-20 right-2'>
          <Button
            label='TRY NOW'
            onClick={() => navigate("/pt-agenda")}
            extraClass='animate-pulse'
            small
          />
        </div>
        <div id='menuButton' className='md:hidden flex w-6/12'>
          <button
            className='ounded-full h-auto py-[3px] px-[3px]'
            onClick={() => setShow(true)}
          >
            <IoMenu size={40} className='text-white' />
          </button>
        </div>
      </div>
      <MobileNav show={show} setShow={setShow} navLinks={navLinks} />
    </>
  );
};

export default Nav;

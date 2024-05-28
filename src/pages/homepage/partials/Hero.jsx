import React from "react";

const Hero = () => {
  return (
    <div className='flex md:flex-row flex-col w-full min-h-[400px] text-white 2xl:px-40 md:px-20 px-6 mb-10'>
      <div className='flex flex-col items-center justify-center md:w-6/12 w-full md:order-1 order-2'>
        <img src='/schedule.png' alt='' className='h-full' />
        <div className='mt-20 text-lg md:hidden block'>
          manager tool for personal trainers
        </div>
      </div>

      <div className='flex flex-col items-center justify-center md:w-6/12 w-full md:mb-0 mb-24'>
        <div className='text-5xl italic text-blue-500 font-bold'>
          Personal Trainer{" "}
          <span className='text-right text-rose-500 text-3xl'>AGENDA</span>
        </div>
        <div className='mt-2 text-lg md:block hidden'>
          manager tool for personal trainers
        </div>
      </div>
    </div>
  );
};

export default Hero;

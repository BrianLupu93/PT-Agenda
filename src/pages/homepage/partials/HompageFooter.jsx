import React from "react";
import { SiLinkedin } from "react-icons/si";
import { IoLogoGithub } from "react-icons/io";

const HompageFooter = () => {
  return (
    <div className='bg-zinc-950 w-full py-6 text-white'>
      <div className='flex justify-center gap-10 mb-10'>
        <a
          target='_blank'
          href='https://github.com/BrianLupu93'
          className='flex gap-2 items-center text-lg active:scale-[102%]  hover:text-blue-500'
        >
          <IoLogoGithub />
          <span>github</span>
        </a>
        <a
          target='_blank'
          href='https://www.linkedin.com/in/brian-lupu-491171194/'
          className='flex gap-2 items-center text-lg active:scale-[102%] hover:text-blue-500'
        >
          <SiLinkedin />
          <span>Linkedin</span>
        </a>
      </div>
      <div className='w-full text-center'>
        &#169; Brian Lupu {new Date().getFullYear()}. All Rights Reserved
      </div>
    </div>
  );
};

export default HompageFooter;

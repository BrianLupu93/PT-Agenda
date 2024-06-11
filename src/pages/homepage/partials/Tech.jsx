import React from "react";
import JavascriptIcon from "./icons/JavascriptIcon";
import ReactIcon from "./icons/ReactIcon";
import NodejsIcon from "./icons/NodejsIcon";
import MongoIcon from "./icons/MongoIcon";
import DokerIcon from "./icons/DockerIcon";

const Tech = () => {
  return (
    <div
      className='w-full bg-zinc-950 min-h-[80px] 2xl:px-40 md:px-20 px-6 pt-10 pb-10'
      id='tech'
    >
      <div className='text-4xl italic mb-10 text-rose-500'>
        Developed to solve a real problem
      </div>
      <div className='text-white text-xl md:px-10 px-4 xl:w-8/12 w-full'>
        The Personal Trainer AGENDA development it started from the daily
        problems encountered by a friend, who is a personal trainer. I decided
        to try to find a solution to help him.
        <br />
        My first approach to the project was made with the MERN stack and also
        libraries like Tailwind and Redux.
        <br />
        Because he was very pleased and impressed, i started a new project based
        on it, which will include numerous improvements and restructuring like:
        <ul className='list-disc pl-8 mt-4'>
          <li>New design</li>
          <li>New color-palette</li>
          <li>Code strucure</li>
          <li>Typescript and NestJS</li>
        </ul>
        <div className='mt-4'>
          The new project is already underway and I can't wait to present it to
          you.
        </div>
      </div>
      <div className='grid grid-cols-5 '>
        <JavascriptIcon />
        <ReactIcon />
        <NodejsIcon />
        <MongoIcon />
        <DokerIcon />
      </div>
    </div>
  );
};

export default Tech;

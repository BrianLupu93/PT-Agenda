import React from "react";
import JavascriptIcon from "../partials/icons/JavascriptIcon";
import ReactIcon from "../partials/icons/ReactIcon";
import NodejsIcon from "../partials/icons/NodejsIcon";
import MongoIcon from "../partials/icons/MongoIcon";
import DokerIcon from "../partials/icons/DockerIcon";

const Tech = () => {
  return (
    <div className='w-full bg-zinc-950 min-h-[80px] 2xl:px-40 md:px-20 px-6 pt-10 pb-10'>
      <div className='text-4xl italic mb-10 text-rose-500'>
        Beta version for development test
      </div>
      <div className='text-white text-xl mb-10 xl:w-8/12 w-full'>
        The Personal Trainer AGENDA was created with the MERN stack, but during
        the development, because more and more features was added, the presented
        version is just the BETA. The new version is on the way, and that will
        come with a lot of updates like:
        <ul className='list-disc pl-8 mt-4'>
          <li>New design</li>
          <li>New color-palette</li>
          <li>Code strucure</li>
          <li>Typescript and NestJS</li>
        </ul>
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

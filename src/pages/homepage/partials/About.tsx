import React from "react";

const About = () => {
  return (
    <div className='flex flex-col w-full min-h-[400px] bg-zinc-200 2xl:px-40 md:px-20 px-6 pt-10'>
      <div className='w-full text-center text-4xl italic font-bold mb-10'>
        Discipline and organization
      </div>
      <div className='w-full text-lg italic'>
        It's time to coaching, leave the AGENDA to do the boaring job.
        <br />
        The Personal Trainer AGENDA was created to simplify the management of
        many important aspects that a personal trainer must pay attention and
        time every day of his job. <br /> In many cases, a day of work may have
        a lot of clients, and for every single client the PT, beside to train
        the scheduled training session he must also to take care of other type
        of schedule like:
      </div>
      <ul className='list-disc list-inside'>
        <li>
          Register a subscription that include data such name, how many training
          will be done, the date of start, the price and so on
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default About;

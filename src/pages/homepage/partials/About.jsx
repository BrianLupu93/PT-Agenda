import React from "react";

const About = () => {
  const servcesList = [
    "Register a subscription that include data such name, how many training will be done, the date of start, the price and so on",
    "Track all the trainings that was done or maybe that was rescheduled.",
    "Track all the subscriptions status, know if that is active or expired.",
    "With only a few cliks schedule the clients trainings. No more pencil, calendar and agenda notebook.",
    "Must to reschedule a training session? Than the PT-AGENDA let you do very simple and fast.",
    "Track all the income that you've made.",
  ];

  return (
    <div
      className='flex flex-col w-full min-h-[400px] bg-zinc-200 2xl:px-40 md:px-20 px-6 pt-10 pb-10'
      id='about'
    >
      <div className='w-full text-4xl italic font-bold mb-10'>
        Discipline and organization
      </div>
      <div className='xl:w-8/12 w-full'>
        <div className='w-full text-xl italic mb-10'>
          It's time to coaching, leave the AGENDA to do the boaring job.
          <br />
          The Personal Trainer AGENDA was created to simplify the management of
          many important aspects that a personal trainer must pay attention and
          time every day of his job. <br /> In many cases, a day of work may
          have a lot of clients, and for every single client the PT, beside to
          train the scheduled training session he must also to take care of
          other type of schedule like:
        </div>
      </div>

      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
        {servcesList.map((el, i) => {
          return (
            <div
              className='bg-violet-500 text-white font-bold shadow-lg shadow-violet-950/70 italic cw-full  hover:scale-[102%] hover:cursor-pointer hover:bg-violet-600'
              key={i}
            >
              <div className='flex h-full items-center py-6 px-10'>{el}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;

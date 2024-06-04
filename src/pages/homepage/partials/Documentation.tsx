import React, { useState } from "react";
import { docData } from "./docData";

const Documentation = () => {
  const [showDoc, setShowDoc] = useState({
    title: docData[0].title,
    subtitle: docData[0].subtitle[0],
    content: docData[0].content[0],
  });

  return (
    <div className='w-full bg-zinc-200 min-h-[80px] 2xl:px-40 md:px-20 px-6 pt-10 pb-10'>
      <div className='text-4xl italic mb-10 font-bold'>
        How to use the AGENDA
      </div>
      <div className='flex xl:flex-row flex-col'>
        <div className='xl:w-5/12 w-full xl:mb-0 mb-10'>
          <div className='font-bold text-lg'>
            {docData.map((doc, i) => {
              return (
                <div className='mb-4' key={i}>
                  <div>{doc.title}</div>

                  <ul className='list-disc pl-8 mt-2 font-normal'>
                    {doc.subtitle.map((sub, z) => {
                      return (
                        <li>
                          <button
                            className='text-left hover:text-rose-500 focus:text-blue-500 focus:font-bold'
                            onClick={(e) => {
                              e.preventDefault();
                              setShowDoc({
                                title: docData[i].title,
                                subtitle: docData[i].subtitle[z],
                                content: docData[i].content[i],
                              });
                            }}
                          >
                            {sub}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        {/*  */}
        <div className='xl:w-7/12 w-full'>
          <div className='w-full border border-black rounded-md p-6'>
            <div className='text-2xl font-bold mb-10'>{showDoc.title}</div>
            <div className='text-xl mb-4'>{showDoc.subtitle}</div>
            <div className=''>{showDoc.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;

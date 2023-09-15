import React, { useEffect } from 'react';
import Button from '../Utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIncomeByYear,
  getIncomeYears,
} from '../../features/clients/clientsSlice';
import dayjs from 'dayjs';

const IncomesPage = () => {
  const dispatch = useDispatch();
  const years = useSelector((state) => state.clients.incomeYears);
  const income = useSelector((state) => state.clients.incomeByYear);
  const subscriptions = useSelector((state) => state.clients.subscriptions);
  const thisYear = dayjs().year().toString();

  if (subscriptions.length > 0) {
    useEffect(() => {
      dispatch(getIncomeYears());
    }, []);

    useEffect(() => {
      dispatch(getIncomeByYear(thisYear));
    }, []);
  }

  return (
    <div className='h-full md:w-9/12 w-full mx-auto flex flex-col'>
      <div className='w-full md:mb-0 mb-10'>
        <div className='flex flex-col md:px-10 px-0 w-full'>
          <div className='text-3xl mb-10 text-center'>Incasari</div>
          {subscriptions.length > 0 && (
            <>
              <div className='w-full flex flex-wrap'>
                {years &&
                  years.length > 0 &&
                  years.map((btn, i) => {
                    return (
                      <Button
                        onClick={() => dispatch(getIncomeByYear(btn))}
                        key={i}
                        label={btn}
                        extraClass='w-20 ml-2 mb-2'
                        small
                        bgClass={income.year === btn && 'bg-blue-600'}
                      />
                    );
                  })}
              </div>
              <div className='w-full text-center text-xl font-bold'>
                {income !== {} && income.year}
              </div>
              <div className='w-full mt-8 border border-black rounded-md p-4'>
                {income !== {} &&
                  income.months !== undefined &&
                  income.months.map((month, i) => {
                    return (
                      <div key={i}>
                        <div className='text-xl bg-gray-300 py-1 px-2 rounded-md mb-4'>
                          {month.name}
                        </div>
                        <div>
                          {month.clients.map((client, i) => {
                            return (
                              <div className='flex md:px-10 px-0' key={i}>
                                <div className='w-full'>{client.name}</div>
                                <div className='w-full text-right font-bold'>
                                  {client.price}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className='w-full text-right border-t-2 border-rose-500 my-2 md:pr-10 pr-0'>
                          <span className='text-lg mr-2 font-bold text-blue-500'>
                            TOTAL:
                          </span>{' '}
                          <span className='font-bold'>{month.total}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomesPage;

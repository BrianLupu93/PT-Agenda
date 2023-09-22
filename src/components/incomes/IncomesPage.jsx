import React, { useEffect, useState } from 'react';
import Button from '../Utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import {} from '../../features/clients/clientsSlice';
import dayjs from 'dayjs';
import { getAllIncomes } from '../../features/income/incomeSlice';
import { months } from '../../data/dataVariables';

const IncomesPage = () => {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.income.incomes);
  const [yearBtn, setYearBtn] = useState();
  const thisYear = dayjs().year().toString();

  useEffect(() => {
    dispatch(getAllIncomes());
    setYearBtn(thisYear);
  }, []);

  const filterYears = () => {
    const years = [];
    incomes.map((income) => {
      if (!years.includes(income.date.slice(6, 10))) {
        years.push(income.date.slice(6, 10));
      }
      return;
    });
    return years;
  };

  const filterMonths = (year) => {
    const monthsArr = [];
    incomes.map((income) => {
      const month = parseInt(income.date.slice(3, 5)) - 1;

      if (
        income.date.slice(6, 10) === year &&
        !monthsArr.includes(months[month])
      ) {
        monthsArr.push(months[month]);
      }
    });
    return monthsArr;
  };

  return (
    <div className='h-full md:w-9/12 w-full mx-auto flex flex-col'>
      <div className='w-full md:mb-0 mb-10'>
        <div className='flex flex-col md:px-10 px-0 w-full'>
          <div className='text-3xl mb-10 text-center'>Incasari</div>
          {incomes !== undefined && incomes.length > 0 && (
            <>
              <div className='w-full flex flex-wrap'>
                {incomes.length > 0 &&
                  filterYears().map((btn, i) => {
                    return (
                      <div className='w-20 ml-2 mb-2' key={i}>
                        <Button
                          onClick={() => setYearBtn(btn)}
                          label={btn}
                          small
                          bgClass={yearBtn === btn && 'bg-blue-600'}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className='w-full text-center text-xl font-bold'>
                {/* {income !== {} && income.year} */}
              </div>
              <div className='w-full mt-8 border border-black rounded-md p-4'>
                {incomes.length > 0 &&
                  filterMonths(yearBtn).map((month, i) => {
                    let total = 0;
                    incomes.map((inc) => {
                      if (
                        inc.date.slice(6, 10) === yearBtn &&
                        months[parseInt(inc.date.slice(3, 5)) - 1] === month
                      ) {
                        total += inc.price;
                      }
                    });
                    return (
                      <div key={i}>
                        <div className='text-xl bg-gray-300 py-1 px-2 rounded-md mb-4'>
                          {month}
                        </div>
                        {incomes.map((income, i) => {
                          if (
                            income.date.slice(6, 10) === yearBtn &&
                            months[parseInt(income.date.slice(3, 5)) - 1] ===
                              month
                          ) {
                            return (
                              <div key={i + 'm'}>
                                <div className='flex md:px-10 px-0' key={i}>
                                  <div className='w-full'>{income.name}</div>
                                  <div className='w-full text-right font-bold'>
                                    {income.price}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return;
                        })}
                        <div className='w-full text-right border-t-2 border-rose-500 my-2 md:pr-10 pr-0'>
                          <span className='text-lg mr-2 font-bold text-blue-500'>
                            TOTAL:
                          </span>{' '}
                          <span className='font-bold'>{total}</span>
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

const DayItemMini = ({
  day,
  extraClass,
  handleSelectDay,
  disabled,
  totalDayBookings,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => handleSelectDay(day)}
      className={`flex flex-col justify-center items-center p-4 shadow rounded-sm bg-white w-full  hover:bg-zinc-300 ${extraClass} `}>
      <div className='text-md mb-2'>{day}</div>
      {/* <div className='text-rose-500 text-sm'>{totalDayBookings}</div> */}
    </button>
  );
};

export default DayItemMini;

import React from 'react';
import { useSelector } from 'react-redux';

export const useSelectedDay = () => {
  const selectedDay = useSelector((state) => state.app.selectedDay);

  return selectedDay;
};

export default useSelectedDay;

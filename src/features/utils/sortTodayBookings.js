export default (bookings) => {
  const sorted = bookings.sort((a, b) => {
    const endHourA = parseInt(a.day.time.slice(6, 8));
    const endMinA = parseInt(a.day.time.slice(9, 11));
    const timeA = endHourA * 3600 + endMinA * 60;

    const endHourB = parseInt(b.day.time.slice(6, 8));
    const endMinB = parseInt(b.day.time.slice(9, 11));
    const timeB = endHourB * 3600 + endMinB * 60;

    if (timeA > timeB) {
      return 1;
    }
    if (timeA < timeB) {
      return -1;
    }
    return 0;
  });

  return sorted;
};

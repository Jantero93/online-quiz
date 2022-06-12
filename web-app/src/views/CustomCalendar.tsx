import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [clickedDay, setClickedDay] = useState(new Date());

  return (
    <div className="_ColorDepth-Bg-3">
      <Calendar onClickDay={setClickedDay} onChange={setDate} value={date} />
    </div>
  );
};

export default CustomCalendar;

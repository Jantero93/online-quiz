import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Calendar from 'react-calendar';

import CalendarForm from '../components/CustomCalendar/CalendarForm';

import '../styles/react-calendar.css';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [clickedDay, setClickedDay] = useState(new Date());

  return (
    <Container className="mt-5">
      <Row className="_ColorDepth-Bg-3 rounded d-flex justify-content-center">
        <Calendar
          className="m-5 react-calendar"
          onClickDay={setClickedDay}
          onChange={setDate}
          value={date}
        />
      </Row>
      <Row className="_ColorDepth-Bg-3">
        <CalendarForm clickedDate={clickedDay} />
      </Row>
    </Container>
  );
};

export default CustomCalendar;

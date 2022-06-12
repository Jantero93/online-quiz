import React from 'react';

import { formatDate } from '../../utils/date';

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import '../../styles/calendarform.css';

type Props = {
  clickedDate: Date;
};

const CalendarForm = ({ clickedDate }: Props) => {
  return (
    <>
      <Col xs={{ offset: 4, span: 2 }}>
        <Row>
          <p>Date</p>
        </Row>
        <Row>
          <p>Daily</p>
        </Row>
        <Row>
          <p>Week average</p>
        </Row>
      </Col>
      <Col xs={{ span: 2 }}>
        <Row>
          <p>{formatDate(clickedDate, 'DD.MM.YYYY')}</p>
        </Row>
        <Row>
          <p>82 kg</p>
        </Row>
        <Row>
          <p>83,33 kg</p>
        </Row>
      </Col>
    </>
  );
};

export default CalendarForm;

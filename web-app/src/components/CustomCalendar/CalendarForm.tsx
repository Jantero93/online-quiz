import React from 'react';

import { formatDate } from '../../utils/date';

import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

type Props = {
  clickedDate: Date;
};

const CalendarForm = ({ clickedDate }: Props) => {
  return (
    <Container className="_ColorDepth-Bg-3 d-flex justify-content-center">
      <Col xs={{ offset: 1, span: 2 }}>
        <Row>Date</Row>
        <Row>Daily</Row>
        <Row>Week average</Row>
      </Col>
      <Col xs={{ span: 2 }}>
        <Row>{formatDate(clickedDate, 'DD.MM.YYYY')}</Row>
        <Row>82 kg</Row>
        <Row>83,33 kg</Row>
      </Col>
      <Col xs={{ offset: 1, span: 6 }}>test 2</Col>
    </Container>
  );
};

export default CalendarForm;

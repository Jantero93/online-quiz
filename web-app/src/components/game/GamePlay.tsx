import React from 'react';

/* UI */
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';

const GamePlay = (): JSX.Element => {
  const { gameId } = useParams();
  console.log('gameId', gameId);
  return (
    <div>
      <Container>
        <Row>
          <Col>1</Col>
          <Col>2</Col>
        </Row>
        <Row>
          <Col>3</Col>
          <Col>4</Col>
        </Row>
      </Container>
    </div>
  );
};

export default GamePlay;

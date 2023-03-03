import React from 'react';
import { useParams } from 'react-router-dom';

/* UI */
import { Container, Row, Col } from 'react-bootstrap';
import GridCardItem from './GridCardItem';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';

const GamePlay = () => {
  const [answer, setAnswer] = React.useState<number>();
  const { gameId } = useParams();
  console.log('gameId', gameId);
  console.log('answer', answer);
  return (
    <Container
      className="text-white mt-5 p-3"
      style={{ backgroundColor: '#18263D' }}
    >
      <Row xs="auto" className="justify-content-center">
        <GridCardItem
          questionCard
          text="Do pineapple belong to pizza or not?"
        />
      </Row>
      <Row xs="auto" className="justify-content-center mt-3">
        <Col>
          <GridCardItem
            text="This is answer: 1"
            answerNumber={1}
            setAnswer={setAnswer}
          />
        </Col>
        <Col>
          <GridCardItem
            text="This is answer: 2"
            answerNumber={2}
            setAnswer={setAnswer}
          />
        </Col>
      </Row>
      <Row xs="auto" className="justify-content-center mt-1">
        <Col>
          <GridCardItem
            text="This is answer: 3"
            answerNumber={3}
            setAnswer={setAnswer}
          />
        </Col>
        <Col>
          <GridCardItem
            text="This is answer: 4"
            answerNumber={4}
            setAnswer={setAnswer}
          />
        </Col>
      </Row>

      <ProgressBar className="mt-5 mb-3" variant="info" now={45} />
    </Container>
  );
};

export default GamePlay;

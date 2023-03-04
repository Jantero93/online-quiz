import React from 'react';
import { Card } from 'react-bootstrap';

type GridCardItemProps = {
  text: string;
  questionCard?: boolean;
  answerNumber?: number;
  setAnswer?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const GridCardItem = ({
  text,
  questionCard,
  answerNumber,
  setAnswer
}: GridCardItemProps) => {
  const [hover, setHover] = React.useState(false);

  const onHoverStyles: React.CSSProperties = {
    color: 'pink',
    cursor: 'pointer'
  };

  return (
    <Card
      body
      bg="secondary"
      border="secondary"
      style={{
        fontSize: questionCard ? 30 : 20,
        ...(hover ? onHoverStyles : '')
      }}
      onMouseEnter={questionCard ? undefined : () => setHover(true)}
      onMouseLeave={questionCard ? undefined : () => setHover(false)}
      onClick={() => !questionCard && setAnswer && setAnswer(answerNumber)}
    >
      {text}
    </Card>
  );
};

export default GridCardItem;

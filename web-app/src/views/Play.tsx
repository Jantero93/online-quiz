import React, { useState } from 'react';

/* UI */
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';

import { SetUserInfo } from '../store/reducers/userReducer';

const Play = (): JSX.Element => {
  const [nickname, setNickname] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');

  const validateUserName = (userName: string): boolean => {
    const onlyLettersNumberRegex = '^[a-zA-Z0-9_.-]*$';
    const trimmed = userName.trim();

    if (!trimmed.length) return false;
    if (!trimmed.match(onlyLettersNumberRegex)) return false;

    return true;
  };

  const handleOnPlay = () => {
    // Create game backend
    console.log('test');
  };

  const handleOnJoin = () => {
    //* Join game backend
    console.log('join');
  };

  return (
    <Container className="mt-5 border border-dark">
      <InputGroup className="mb-4">
        <Button onClick={handleOnPlay} size="lg">
          Play
        </Button>
        <Form.Control
          placeholder="Nickname"
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Button size="lg" onClick={handleOnJoin}>
          Join Game
        </Button>
        <Form.Control
          placeholder="Game ID"
          onChange={(e) => setGameId(e.target.value)}
        />
      </InputGroup>
    </Container>
  );
};

export default Play;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Form from 'react-bootstrap/esm/Form';

import { createUser } from '../services/userServices';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const isPasswordsSame = () => password === confirmPassword;
  const isPasswordValid = () => password.length >= 6 && password.length <= 30;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    if (!isPasswordsSame()) {
      setErrors((errors) => [...errors, 'Passwords do not match']);
    }
    if (!isPasswordValid()) {
      setErrors((errors) => [...errors, 'Password is not valid']);
    }

    if (errors.length) return;

    try {
      await createUser(email, password);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Form
      className="_ColorDepth-Bg-4 _Max_Width_500 mx-auto mt-5 p-3 rounded"
      onSubmit={submit}
    >
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" />
        <Form.Text className="text-muted">
          {`We'll never share your email with anyone else.`}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="retypePassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>

      <ButtonGroup className="d-flex justify-content-between">
        <Button
          className="_Max_Width_150"
          variant="dark"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button className="_Max_Width_150" variant="info" type="submit">
          Sign up
        </Button>
      </ButtonGroup>
      {errors.map((error) => (
        <p className="_Error-Text" key={error}>
          {error}
        </p>
      ))}
    </Form>
  );
};

export default SignUp;

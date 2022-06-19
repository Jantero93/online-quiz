import React, { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

import { createUser } from '../services/userServices';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const isPasswordsSame = () => password === confirmPassword;
  const isPasswordValid = () => password.length >= 6 && password.length <= 30;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    if (!isPasswordsSame()) setErrors(errors.concat("Password don't match"));
    if (!isPasswordValid()) setErrors(errors.concat('Password length 6 - 30'));
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

      <Button className="_ColorDepth-Bg-3" type="submit">
        Submit
      </Button>
      {errors.map((error) => (
        <p className="_Error-Text" key={error}>
          {error}
        </p>
      ))}
    </Form>
  );
};

export default SignUp;

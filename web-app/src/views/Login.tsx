import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

import { setUserLogged } from '../store/actions/userActions';

import { loginUser } from '../services/userServices';

import { saveTokensLocalStorage } from '../utils/localStorage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { access_token, refresh_token } = await loginUser(email, password);
      dispatch(setUserLogged(access_token, refresh_token, true));
      saveTokensLocalStorage(access_token, refresh_token);
      navigate('/');
    } catch (error) {
      console.error('error', error);
      setError('Login failed');
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
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant={'info'} type="submit">
        Login
      </Button>
      <p>
        No account? <Link to="/login/sign-up">Register here</Link>
      </p>
      {error && <p className="_Error-Text">{error}</p>}
    </Form>
  );
};

export default Login;

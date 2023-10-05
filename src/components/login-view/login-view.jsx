import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { apiURL } from '../../config';
import PropTypes from 'prop-types';

export const LoginView = ({
 setUserName,
  setToken,
  setUserObject,
  setRefreshFlag,
 }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch(`${apiURL}/login/?Username=${username}&Password=${password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          localStorage.setItem('userObject', JSON.stringify(data.user));
          setUserName(data.user);
          setToken(data.token);
          setUserObject(data.user);
          setRefreshFlag((prev) => !prev); // <-- replace window.location.reload()
        } else {
          alert('No such user');
        }
      })
      .catch((error) => {
        alert('Something went wrong');
        console.error(error);
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="mt-3" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

LoginView.propTypes = {
  setUserName: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  setUserObject: PropTypes.func.isRequired,
  setRefreshFlag: PropTypes.func.isRequired
};

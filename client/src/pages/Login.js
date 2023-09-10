import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });
      // Handle successful login, e.g., store token in local storage
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="login-container">
      {' '}
      {/* Add a custom CSS class */}
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center">
            <h2>Login</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                className="password-input"
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>

          {error && <p>{error.message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

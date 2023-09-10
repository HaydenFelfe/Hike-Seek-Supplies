import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });
      // Handle successful signup, e.g., store token in local storage
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="signup-container">
      {' '}
      {/* Add a custom CSS class */}
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center">
            <h2>Sign Up</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
            </Form.Group>

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
                Sign Up
              </Button>
            </div>
          </Form>

          {error && <p>{error.message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

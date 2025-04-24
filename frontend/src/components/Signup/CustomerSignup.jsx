import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer } from '../../redux/actions/authCusActions';
import Layout from '../Layout/Layout';

const CustomerSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerRegister = useSelector((state) => state.customerRegister || {});
  const { loading, customer, error } = customerRegister;

  useEffect(() => {
    if (error) {
      console.error('Registration error:', error);
    }
  }, [error]);

  const clearErrorsOnInput = () => {
    if (errorMessage) setErrorMessage('');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    dispatch(registerCustomer(trimmedName, trimmedEmail, trimmedPassword))
      .then(() => {
        navigate('/customer_login');
      })
      .catch((err) => {
        console.error('Signup failed:', err);
        setErrorMessage(err.message || 'Signup failed');
      });
  };

  return (
    <Layout>
      <div className="signup-page" style={{ backgroundColor: '#e0e4e8', minHeight: '100vh' }}>
        <Container className="d-flex align-items-center justify-content-center"
         style={{ marginTop: '0', paddingTop: '0', height: '100vh' }}>
          <Row className="w-100">
            <Col md={6} className="mx-auto">
              <div className="signup-box p-4 bg-white rounded shadow">
                <h2 className="text-center mb-4">Customer Registration</h2>
                <Form onSubmit={handleSignup}>
                  <Form.Group controlId="formName">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearErrorsOnInput();
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearErrorsOnInput();
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password:</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearErrorsOnInput();
                        }}
                        required
                      />
                      <Button
                        variant="link"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="ms-2"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </Form.Group>

                  {(error || errorMessage) && (
                    <Alert variant="danger" className="text-center mt-3">
                      {errorMessage || error}
                    </Alert>
                  )}

                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 mt-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Registering...
                      </>
                    ) : (
                      'Register'
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <span
                      style={{ color: '#4CAF50', cursor: 'pointer' }}
                      onClick={() => navigate('/login_type')}
                    >
                      Login here
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default CustomerSignup;

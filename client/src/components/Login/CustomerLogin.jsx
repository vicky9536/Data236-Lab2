import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginCustomer } from '../../redux/actions/authCusActions';
import Layout from '../Layout/Layout'; // using Layout instead of CustomTopNavbar

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin || {});
  const { loading, customer, error } = customerLogin;

  useEffect(() => {
    if (customer) {
      navigate('/customer_dashboard');
    }
  }, [customer, navigate]);

  useEffect(() => {
    if (error) {
      console.error('Customer login error:', error);
    }
  }, [error]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Both fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    dispatch(loginCustomer(trimmedEmail, trimmedPassword));
  };

  return (
    <Layout>
      <div className="login-page" style={{ backgroundColor: '#e0e4e8', minHeight: '100vh' }}>
        <Container className="d-flex align-items-center justify-content-center"
         style={{ marginTop: '0', paddingTop: '0', height: '100vh' }}>
          <Row className="w-100">
            <Col md={6} className="mx-auto">
              <div className="login-box p-4 bg-white rounded shadow">
                <h2 className="text-center mb-4">Customer Login</h2>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMessage('');
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
                          setErrorMessage('');
                        }}
                        required
                      />
                      <Button
                        variant="link"
                        onClick={() => setShowPassword((prevState) => !prevState)}
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
                        <Spinner animation="border" size="sm" /> Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Don't have an account?{' '}
                    <a href="/registration_type" style={{ color: '#4CAF50' }}>
                      Sign up
                    </a>
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

export default CustomerLogin;

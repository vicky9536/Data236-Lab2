import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerRestaurant } from '../../redux/actions/authRestActions';
import Layout from '../Layout/Layout'; // Unified layout

const RestaurantSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const restaurantRegister = useSelector((state) => state.restaurantRegister || {});
  const { loading, restaurant, error } = restaurantRegister;

  useEffect(() => {
    if (error) {
      console.error('Restaurant registration error:', error);
    }
  }, [error]);

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedLocation = location.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedLocation) {
      setErrorMessage('All fields are required.');
      return;
    }

    dispatch(registerRestaurant(trimmedName, trimmedEmail, trimmedPassword, trimmedLocation))
      .then(() => navigate('/restaurant_login'))
      .catch((err) => {
        console.error('Signup failed:', err);
        setErrorMessage(err.message || 'Signup failed. Please try again.');
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
                <h2 className="text-center mb-4">Merchant Registration</h2>
                <Form onSubmit={handleSignup}>
                  <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrorMessage('');
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email:</Form.Label>
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

                  <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage('');
                      }}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="location" className="mt-3">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your location"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setErrorMessage('');
                      }}
                      required
                    />
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
                        <Spinner animation="border" size="sm" className="me-2" />
                        Registering...
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

export default RestaurantSignup;

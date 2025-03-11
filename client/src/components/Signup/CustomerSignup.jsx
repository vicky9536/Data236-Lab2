import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer } from '../../redux/actions/authCusActions';

import './Registration.css';

const CustomerSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerRegister = useSelector((state) => state.customerRegister || {});
  const { loading, customer, error } = customerRegister;

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    console.log('Sending signup request with:', { name, email, password });

    // Dispatch the action to register the customer
    dispatch(registerCustomer(name, email, password))
      .then(() => {
        // After successful registration, navigate to login page
        navigate('/login');
      })
      .catch((err) => {
        // Handle error if registration fails
        setErrorMessage(err.message);
      });
  };

  const handleLoginClick = async(e) => {
    navigate('/login_type');
  };

  useEffect(() => {
    // If the customer is already logged in, redirect to the dashboard
    if (customer || localStorage.getItem('authToken')) {
      navigate('/customer_dashboard');
    }
  }, [customer, navigate]);


  return (
    <div className="signup-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container-fluid">
          <a 
            className="navbar-brand" 
            onClick={() => navigate('/')} 
            style={{ cursor: 'pointer' }}
          >
            <img 
              src="/images/ubereats_logo.png" 
              alt="Uber Eats Logo" 
              style={{ height: '20px' }} 
            />
          </a>
          <div className="d-flex">
            <button className="btn btn-outline-dark mx-2 px-4 rounded-pill" onClick={() => navigate('/login_type')}>
              Login
            </button>
            <button className="btn btn-dark px-4 rounded-pill">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <Container className="mt-5 pt-5">
        <h2 className="text-center text-dark">Customer Registration</h2>
        <Form onSubmit={handleSignup} className="mt-4 p-4 border rounded shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          
          {/* Name */}
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Name: </Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your full name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </Form.Group>

          {/* Email */}
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email: </Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>

          {/* Password */}
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password: </Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter your password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </Form.Group>

          {error && <p className="text-danger text-center mt-3">{error}</p>}
          {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

          <div className="center-button">
            <Button 
              variant="success" 
              type="submit" 
              className="mt-4 w-100 btn-green"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </Form>

        {/* "Do you already have an account?" Section */}
        <div className="text-center mt-3">
          <p className="text-muted">
            Do you already have an account?{' '}
            <a 
              href="/login" 
              style={{ color: '#4CAF50', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault(); // Prevent page reload
                navigate('/login'); // Navigate to the login page
              }}
            >
              Login here
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default CustomerSignup;

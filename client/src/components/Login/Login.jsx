import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginCustomer } from '../../redux/actions/authCusActions'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin || {});
  const { loading, customer, error } = customerLogin;

  console.log('customer:', customer);
  console.log('localStorage.getItem:', localStorage.getItem('authToken'));

  useEffect(() => {
    // If the customer is already logged in, redirect to the dashboard
    if (customer && localStorage.getItem('authToken')) {
      navigate('/customer_dashboard');
    }
  }, [customer, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Both fields are required');
      return;
    }
    console.log('Sending login request with:', { email, password });
    dispatch(loginCustomer(email, password));
  };

  const handleSignupClick = async () => {
    navigate('/signup');
  };

  return (
    <div className="login-page" style={{ backgroundColor: '#e0e4e8', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/images/ubereats_logo.png" alt="Uber Eats Logo" style={{ height: '20px' }} />
          </a>
          <div className="d-flex">
            <button onClick={() => navigate('/login')} className="btn btn-outline-dark mx-2 px-4 rounded-pill">
              Customer Login</button>
            <button onClick={handleSignupClick} className="btn btn-dark px-4 rounded-pill">Sign Up</button>
          </div>
        </div>
      </nav>

      <Container className="d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col md={6} className="mx-auto">
            <div className="login-box p-4">
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter your password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>

                {error && <p className="text-danger text-center mt-3">{error}</p>}
                {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

                <Button variant="success" type="submit" className="w-100 mt-3" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p className="text-muted">Don't have an account? <a href="/signup" style={{ color: '#4CAF50' }}>Sign up</a></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

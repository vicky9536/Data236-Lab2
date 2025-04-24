import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import '../Signup/Signup.css';

const LoginType = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/customer_register');
  };

  const handleRestaurantClick = () => {
    navigate('/restaurant_register');
  };

  return (
    <Layout>
      <div className="login-type-container text-center">
        <h2 className="text-dark">Select User Type</h2>
        <div className="mt-4">
          <Button
            variant="success"
            onClick={handleCustomerClick}
            className="mr-3 btn-green btn-lg btn-square"
          >
            Customer
          </Button>
          <Button
            variant="dark"
            onClick={handleRestaurantClick}
            className="btn-black btn-lg btn-square"
          >
            Merchant
          </Button>
          <div className="text-center mt-3">
            <p className="text-muted">
              Don't have an account?{' '}
              <a href="/registration_type" style={{ color: '#4CAF50' }}>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginType;

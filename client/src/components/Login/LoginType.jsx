import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import '../Signup/Signup.css';

const LoginType = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCustomerClick = () => {
    navigate('/login');
  };

  const handleRestaurantClick = () => {
    navigate('/restaurant_login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/images/ubereats_logo.png" style={{height: '20px'}} />
          </a>
          <div className="d-flex">
            <button onClick={handleLoginClick} className="btn btn-outline-dark mx-2 px-4 rounded-pill">Login</button>
            <button onClick={handleSignupClick} className="btn btn-dark px-4 rounded-pill">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5 pt-5 text-center">
        <h2 className="text-dark">Log in as</h2>
        <div className="mt-4">
          <Button variant="success" onClick={handleCustomerClick} className="mr-3 btn-green btn-lg btn-square">
            Customer
          </Button>
          <Button variant="dark" onClick={handleRestaurantClick} className="btn-black btn-lg btn-square">
            Merchant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginType;

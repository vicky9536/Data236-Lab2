import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login_type');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/images/ubereats_logo.png" alt="Uber Eats Logo" style={{ height: '20px' }} />
          </a>
          <div className="d-flex">
            <button onClick={handleLoginClick} className="btn btn-outline-dark mx-2 px-4 rounded-pill">Login</button>
            <button onClick={handleSignupClick} className="btn btn-dark px-4 rounded-pill">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="welcome-section d-flex align-items-center text-center">
        <div className="overlay d-flex justify-content-center align-items-center">
          <div className="text-black">
            <h1 className="display-3">Order delivery near you</h1>
            
            {/* Buttons for Sign In and Register */}
            <div className="mt-4">
              <button onClick={handleLoginClick} className="btn btn-outline-dark mx-2 px-4 rounded-pill">
                Login
              </button>
              <button onClick={handleSignupClick} className="btn btn-dark mx-2 px-4 rounded-pill">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

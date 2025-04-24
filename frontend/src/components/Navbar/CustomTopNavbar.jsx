import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Navbar.css';

const CustomTopNavbar = ({ showButtons = true, onToggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left Section: Hamburger + Logo */}
        <div className="d-flex align-items-center">
          <div className="hamburger-menu me-3" onClick={onToggleSidebar}>
            <FaBars size={30} />
          </div>
          <a 
            className="navbar-brand m-0"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/images/ubereats_logo.png"
              alt="Uber Eats Logo"
              style={{ height: '20px' }}
            />
          </a>
        </div>

        {/* Right Section: Buttons */}
        {showButtons && (
          <div className="d-flex">
            <button
              className="btn btn-outline-dark mx-2 px-4 rounded-pill"
              onClick={() => navigate('/login_type')}
            >
              Login
            </button>
            <button
              className="btn btn-dark px-4 rounded-pill"
              onClick={() => navigate('/registration_type')}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomTopNavbar;

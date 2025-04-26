import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Layout.css';

const Layout = ({ children, showButtons = true, isLoggedInDashboard = false, variant = "home" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev); 
  };

  const handleLogoutClick = () => {
    navigate("/logout");
  };

  const renderSidebarLinks = () => {
    if (variant === "dashboard") {
      return (
        <>
          <li className="menu-item">
            <a onClick={() => navigate('/customer_dashboard')}>Dashboard</a>
          </li>
          <li className="menu-item">
            <a onClick={() => navigate('/customer_dashboard/profile')}>Profile</a>
          </li>
          <li className="menu-item">
            <a onClick={() => navigate('/customer_dashboard/orders')}>Orders</a>
          </li>
          <li className="menu-item">
            <a onClick={() => navigate('/customer_dashboard/favorites')}>Favorites</a>
          </li>
          <li className="menu-item">
            <a onClick={() => navigate('/customer_dashboard/cart')}>Cart</a>
          </li>
          <li className="menu-item">
            <a onClick={handleLogoutClick}>Logout</a>
          </li>
        </>
      );
    }
    if (variant === "restaurant_dashboard") {
      return (
        <>
          <li className="menu-item">
            <a onClick={() => navigate('/restaurant_dashboard')}>Dashboard</a>
          </li>
          <li className="menu-item">
            <a onClick={() => navigate('/restaurant/order')}>Orders</a>
          </li>
          <li className="menu-item">
            <a onClick={handleLogoutClick}>Logout</a>
          </li>
        </>
      );
    }
  
    // Default: Home sidebar
    return (
      <>
        <li className="menu-item">
          <a onClick={() => navigate('/')}>Home</a>
        </li>
        <li className="menu-item">
          <a onClick={() => navigate('/login_type')}>Login</a>
        </li>
        <li className="menu-item">
          <a onClick={handleLogoutClick}>Logout</a>
        </li>
      </>
    );
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="navbar-left d-flex align-items-center">
            <div 
              className={`hamburger-menu ${isSidebarOpen ? 'open' : ''}`} 
              onClick={toggleSidebar}
            >
              <FaBars size={30} color={isSidebarOpen ? 'white' : '#343a40'} />
            </div>

            <a className="navbar-brand m-0" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <img
                src="/images/ubereats_logo.png"
                alt="Uber Eats Logo"
                style={{ height: '20px' }}
              />
            </a>
          </div>

          {!isLoggedInDashboard && showButtons && (
            <div className="navbar-right d-flex">
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

          {isLoggedInDashboard && (
            <div className="navbar-right d-flex">
              <button
                className="btn btn-dark px-4 rounded-pill"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content text-white p-3">
          <ul className="menu-list">
            {renderSidebarLinks()}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'blurred' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;

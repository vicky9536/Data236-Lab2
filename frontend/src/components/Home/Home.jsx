import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout variant="home" showButtons={true}>
      <div className="home-container" style={{ margin: 0, padding: 0 }}>
        <div className="welcome-section d-flex align-items-center text-center"
          style={{ margin: 0, padding: 0 }}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-black">
              <h1 className="order-heading mt-0 pt-0" style={{ marginTop: 0, paddingTop: 0 }}>
                Order delivery near you
              </h1>
              <div className="mt-4">
                <button onClick={() => navigate('/login_type')}
                  className="btn btn-outline-dark mx-2 px-4 rounded-pill">
                  Login
                </button>
                <button onClick={() => navigate('/registration_type')}
                  className="btn btn-dark mx-2 px-4 rounded-pill">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

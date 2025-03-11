import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutCustomer } from '../../redux/actions/authCusActions';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(() => {
    const logoutAsync = async () => {
      try {
        await dispatch(logoutCustomer());
        // After dispatching the logout action, navigate to login page
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
  
    logoutAsync();
  }, [dispatch, navigate]);

  return (
    <div>
      <p>You have been logged out successfully. Redirecting...</p>
    </div>
  );
};

export default Logout;

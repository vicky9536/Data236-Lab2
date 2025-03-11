import axios from 'axios';
import {
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGOUT_REQUEST,
  CUSTOMER_LOGOUT_SUCCESS,
  CUSTOMER_LOGOUT_FAIL,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_REGISTER_FAIL,
} from "../constants/authCusConstants";

export const loginCustomer = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LOGIN_REQUEST });
    const { data } = await axios.post(
      'http://127.0.0.1:8383/authC/customer/login',
      { email, password },
      { withCredentials: true }
    );
    localStorage.setItem('authToken', data.token);  // Store auth token
    localStorage.setItem('customer', JSON.stringify(data.customer)); // Store customer data
    dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logoutCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LOGOUT_REQUEST });

    // Remove items from localStorage and clear cookies
    localStorage.removeItem('authToken');
    localStorage.removeItem('customer');
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

    // Optionally, make an API call to inform the server of logout
    const response = await axios.post(
      'http://127.0.0.1:8383/authC/customer/logout',
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      dispatch({ type: CUSTOMER_LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: CUSTOMER_LOGOUT_FAIL,
        payload: 'Logout failed, unexpected response',
      });
    }
  } catch (error) {
    dispatch({
      type: CUSTOMER_LOGOUT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const registerCustomer = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_REGISTER_REQUEST });
    const { data } = await axios.post('http://127.0.0.1:8383/authC/customer/signup', { name, email, password });
    dispatch({ type: CUSTOMER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
     dispatch({ type: CUSTOMER_REGISTER_FAIL, payload: error.response?.data?.message || error.message });
  }
};  
import axios from 'axios';
import { CUSTOMER_LOGIN_REQUEST, CUSTOMER_LOGIN_SUCCESS, CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGOUT_REQUEST, CUSTOMER_LOGOUT_SUCCESS, CUSTOMER_LOGOUT_FAIL,
  CUSTOMER_REGISTER_REQUEST,CUSTOMER_REGISTER_SUCCESS, CUSTOMER_REGISTER_FAIL,
} from "../constants/authCusConstants";

// Customer Login
export const loginCustomer = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LOGIN_REQUEST });

    const { data } = await axios.post(
      'http://127.0.0.1:5001/api/auth/customer/login',
      { email, password },
      { withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
       } // sends/receives cookie
    );

    dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data.customer });
    // Store customer data in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('customer', JSON.stringify(data.customer)); 
  } catch (error) {
    dispatch({
      type: CUSTOMER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Customer Logout
export const logoutCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LOGOUT_REQUEST });

    await axios.post(
      'http://127.0.0.1:5001/api/auth/customer/logout',
      {},
      { withCredentials: true }
    );

    localStorage.removeItem('customer');
    localStorage.removeItem('authToken');
    dispatch({ type: CUSTOMER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: CUSTOMER_LOGOUT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Customer Register
export const registerCustomer = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_REGISTER_REQUEST });

    const { data } = await axios.post(
      'http://127.0.0.1:5001/api/auth/customer/signup',
      { name, email, password },
      { withCredentials: true }
    );

    dispatch({ type: CUSTOMER_REGISTER_SUCCESS, payload: data.customer });
  } catch (error) {
    dispatch({
      type: CUSTOMER_REGISTER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/*
// Auto Load Logged-In Customer on App Start
export const loadCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LOGIN_REQUEST });

    const { data } = await axios.get(
      'http://127.0.0.1:8383/authC/customer/me',
      { withCredentials: true }
    );

    dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data.customer });
    localStorage.setItem('customer', JSON.stringify(data.customer));
  } catch (error) {
    dispatch({ type: CUSTOMER_LOGOUT_SUCCESS }); // optional fallback
  }
};
*/
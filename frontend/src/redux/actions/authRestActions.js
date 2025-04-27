import axios from 'axios';
import { RESTAURANT_LOGIN_REQUEST, RESTAURANT_LOGIN_SUCCESS, RESTAURANT_LOGIN_FAIL,
  RESTAURANT_LOGOUT_REQUEST, RESTAURANT_LOGOUT_SUCCESS, RESTAURANT_LOGOUT_FAIL,
  RESTAURANT_REGISTER_REQUEST, RESTAURANT_REGISTER_SUCCESS, RESTAURANT_REGISTER_FAIL,
} from "../constants/authRestConstants";

export const loginRestaurant = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_LOGIN_REQUEST });
    const { data } = await axios.post(
      'http://127.0.0.1:5002/api/auth/restaurant/login',
      { email, password },
      { withCredentials: true }
    );
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('restaurant', JSON.stringify(data.restaurant));
    dispatch({ type: RESTAURANT_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESTAURANT_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logoutRestaurant = () => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_LOGOUT_REQUEST });

    // Remove items from localStorage and clear cookies
    localStorage.removeItem('authToken');
    localStorage.removeItem('restaurant');
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

    // Optionally, make an API call to inform the server of logout
    const response = await axios.post(
      'http://127.0.0.1:5002/api/auth/restaurant/logout',
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      dispatch({ type: RESTAURANT_LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: RESTAURANT_LOGOUT_FAIL,
        payload: 'Logout failed, unexpected response',
      });
    }
  } catch (error) {
    dispatch({
      type: RESTAURANT_LOGOUT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const registerRestaurant = (name, email, password, location) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_REGISTER_REQUEST });

    const { data } = await axios.post('http://127.0.0.1:5002/api/auth/restaurant/signup', { name, email, password, location });
    console.log("Response from server:", data);
    dispatch({ type: RESTAURANT_REGISTER_SUCCESS, payload: data });
  } catch (error) {
     dispatch({ type: RESTAURANT_REGISTER_FAIL, payload: error.response?.data?.message || error.message });
  }
};  

  
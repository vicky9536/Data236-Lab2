import axios from "axios";
import { GET_CUS_PROFILE_REQUEST, GET_CUS_PROFILE_SUCCESS, GET_CUS_PROFILE_FAILURE, 
    GET_CUS_PROFILE_ORDER_REQUEST, GET_CUS_PROFILE_ORDER_SUCCESS, GET_CUS_PROFILE_ORDER_FAILURE,
    UPDATE_CUS_PROFILE_REQUEST, UPDATE_CUS_PROFILE_SUCCESS, UPDATE_CUS_PROFILE_FAILURE } from "../constants/cusProfileConstants";

const USER_SERVICE_URL = process.env.REACT_APP_USER_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.REACT_APP_ORDER_SERVICE_URL;
const RESTAURANT_SERVICE_URL = process.env.REACT_APP_RESTAURANT_SERVICE_URL;
    
// view
export const getCusProfile = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CUS_PROFILE_REQUEST });

        const { data } = await axios.get(`${USER_SERVICE_URL}/api/profile/viewCus/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });

        dispatch({ type: GET_CUS_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_CUS_PROFILE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// view customer from order
export const getCusProfileOrder = (customerId) => async (dispatch) => {
    try {
        dispatch({ type: GET_CUS_PROFILE_ORDER_REQUEST });
        const { data } = await axios.get(`${USER_SERVICE_URL}/api/profile/viewCus/${customerId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: GET_CUS_PROFILE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_CUS_PROFILE_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// update
export const updateCusProfile = (updatedProfile) => async (dispatch) => {
    try {
        console.log("Updating profile with:", updatedProfile);
        dispatch({ type: UPDATE_CUS_PROFILE_REQUEST });

        const { data } = await axios.put(`${USER_SERVICE_URL}/api/profile/updateCus/me`, updatedProfile, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });

        console.log("API Response:", data);
        dispatch({ type: UPDATE_CUS_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_CUS_PROFILE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};


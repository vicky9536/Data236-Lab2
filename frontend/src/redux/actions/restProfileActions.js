import axios from "axios";
import { GET_REST_PROFILE_REQUEST, GET_REST_PROFILE_SUCCESS, GET_REST_PROFILE_FAILURE,
    GET_MY_REST_PROFILE_REQUEST, GET_MY_REST_PROFILE_SUCCESS, GET_MY_REST_PROFILE_FAILURE,
    UPDATE_REST_PROFILE_REQUEST, UPDATE_REST_PROFILE_SUCCESS, UPDATE_REST_PROFILE_FAILURE } from "../constants/restProfileConstants";

export const getRestProfile = (restaurant_name) => async (dispatch) => {
    try {
        dispatch({ type: GET_REST_PROFILE_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:8383/resProfile/restaurants/${restaurant_name}/profile`,
            { withCredentials: true }
        );
        dispatch({ type: GET_REST_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_REST_PROFILE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getMyRestProfile = () => async (dispatch) => {
    try {
        dispatch({ type: GET_MY_REST_PROFILE_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:8383/resProfile/restaurants/profile/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: GET_MY_REST_PROFILE_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: GET_MY_REST_PROFILE_FAILURE,
            
            payload: error.response?.data?.message || error.message,
        });
    }
}

export const updateRestProfile = (restaurant_Id, updatedProfile) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REST_PROFILE_REQUEST });
        console.log("updatedProfile: ", updatedProfile);
        const { data } = await axios.put(`http://127.0.0.1:8383/resProfile/restaurants/${restaurant_Id}/profile`, updatedProfile, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: UPDATE_REST_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_REST_PROFILE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};
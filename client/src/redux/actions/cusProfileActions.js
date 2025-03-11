import axios from "axios";
import { GET_CUS_PROFILE_REQUEST, GET_CUS_PROFILE_SUCCESS, GET_CUS_PROFILE_FAILURE, 
    UPDATE_CUS_PROFILE_REQUEST, UPDATE_CUS_PROFILE_SUCCESS, UPDATE_CUS_PROFILE_FAILURE } from "../constants/cusProfileConstants";

export const getCusProfile = (customer_Id) => async (dispatch) => {
    try {
        dispatch({ type: GET_CUS_PROFILE_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:8383/cusProfile/viewCus/${customer_Id}`,
            { withCredentials: true }
        );
        dispatch({ type: GET_CUS_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_CUS_PROFILE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateCusProfile = (customer_Id, updatedProfile) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CUS_PROFILE_REQUEST });
        const { data } = await axios.put(`http://127.0.0.1:8383/cusProfile/updateCus/${customer_Id}`, updatedProfile);
        dispatch({ type: UPDATE_CUS_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_CUS_PROFILE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};
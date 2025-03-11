import axios from "axios";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILURE,
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE } from "../constants/orderConstants";

export const getOrder = (restaurant_Id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:8383/orders/viewOrder/${restaurant_Id}`);
        dispatch({ type: GET_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createOrder = (customer_Id, orderInput) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const { data } = await axios.post(`http://127.0.0.1:8383/orders/create/${customer_Id}`, orderInput);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateOrder = (order_Id, restaurant_Id, orderInput) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        const { data } = await axios.put(`http://127.0.0.1:8383/orders/update/${restaurant_Id}/${order_Id}`, orderInput);
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};
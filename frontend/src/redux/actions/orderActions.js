import axios from "axios";
import { GET_CUS_ORDER_REQUEST, GET_CUS_ORDER_SUCCESS, GET_CUS_ORDER_FAILURE,
    GET_RES_ORDER_REQUEST, GET_RES_ORDER_SUCCESS, GET_RES_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAILURE,
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE,
    CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE } from "../constants/orderConstants";

const USER_SERVICE_URL = process.env.REACT_APP_USER_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.REACT_APP_ORDER_SERVICE_URL;
const RESTAURANT_SERVICE_URL = process.env.REACT_APP_RESTAURANT_SERVICE_URL;
    

export const getAllCustomerOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CUS_ORDER_REQUEST });
        const { data } = await axios.get(`${ORDER_SERVICE_URL}/api/order/viewCusOrder`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: GET_CUS_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_CUS_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};         

export const getAllRestaurantOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_RES_ORDER_REQUEST });
        const { data } = await axios.get(`${ORDER_SERVICE_URL}/api/order/viewResOrder`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: GET_RES_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_RES_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getOrderById = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_BY_ID_REQUEST });
        const { data } = await axios.get(`${ORDER_SERVICE_URL}/api/order/${orderId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ORDER_BY_ID_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createOrder = (orderInput) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const { data } = await axios.post(`${ORDER_SERVICE_URL}/api/order/create`, orderInput, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateOrder = (order_Id, orderInput) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        const { data } = await axios.put(`${ORDER_SERVICE_URL}/api/order/update/${order_Id}`, orderInput, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// cancel order
export const cancelOrder = (order_Id) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_ORDER_REQUEST });
        const { data } = await axios.put(`${ORDER_SERVICE_URL}/api/order/cancel/${order_Id}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CANCEL_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};
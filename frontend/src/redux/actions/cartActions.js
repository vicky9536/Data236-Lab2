import axios from "axios";
import { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, 
    GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE, 
    DELETE_CART_REQUEST, DELETE_CART_SUCCESS, DELETE_CART_FAILURE, 
    CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from "../constants/cartConstants";

export const getCart = (customer_Id) => async (dispatch) => {
    try {
        dispatch({ type: GET_CART_REQUEST });
        const {data} = await axios.get(`http://127.0.0.1:8383/cart/getCart/${customer_Id}`);
        console.log("data-action: ", data);
        dispatch({ type: GET_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.message });
    }
};

export const addToCart = (customer_Id, cartItem) => async (dispatch) => {
    try {
        console.log("data-action: ", cartItem);
        dispatch({ type: ADD_TO_CART_REQUEST });
        const {data} = await axios.post(`http://127.0.0.1:8383/cart/addCart/${customer_Id}`,cartItem);
        console.log("data-action: ", data);
        dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message });
    }
};

export const deleteCart = (customer_Id, cart_id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CART_REQUEST });
        const {data} = await axios.delete(`http://127.0.0.1:8383/cart/deleteCart/${customer_Id}/${cart_id}`);
        dispatch({ type: DELETE_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_CART_FAILURE, payload: error.message });
    }
};

export const checkout = (customer_Id) => async (dispatch) => {
    try {
        dispatch({ type: CHECKOUT_REQUEST });
        const {data} = await axios.post(`http://127.0.0.1:8383/cart/checkout/${customer_Id}`);
        dispatch({ type: CHECKOUT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CHECKOUT_FAILURE, payload: error.message });
    }
};
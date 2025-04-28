import axios from "axios";
import { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, 
    GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE, 
    UPDATE_CART_ITEM_QUANTITY_REQUEST, UPDATE_CART_ITEM_QUANTITY_SUCCESS, UPDATE_CART_ITEM_QUANTITY_FAILURE,
    DELETE_CART_REQUEST, DELETE_CART_SUCCESS, DELETE_CART_FAILURE, 
    CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from "../constants/cartConstants";

export const getCart = () => async (dispatch) => {
    try {
        dispatch({ type: GET_CART_REQUEST });
        const {data} = await axios.get(`http://127.0.0.1:5003/api/cart/getCart`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: GET_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.message });
    }
};

export const addToCart = (cartItem) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });
        const {data} = await axios.post(`http://127.0.0.1:5003/api/cart/addCart`, cartItem,{
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message });
    }
};

export const updateCartItemQuantity = (cartId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CART_ITEM_QUANTITY_REQUEST });
    const { data } = await axios.put(
      `http://127.0.0.1:5003/api/cart/updateCartItem/${cartId}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      }
    );
    dispatch({ type: UPDATE_CART_ITEM_QUANTITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_QUANTITY_FAILURE, payload: error.message });
  }
};

export const deleteCart = (cart_id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_CART_REQUEST });
      const { data } = await axios.delete(`http://127.0.0.1:5003/api/cart/deleteCart/${cart_id}`,{
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
      dispatch({ type: DELETE_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELETE_CART_FAILURE, payload: error.message });
    }
  };

  export const checkout = (cartItems, restaurantId, totalPrice) => async (dispatch) => {
    try {
      dispatch({ type: CHECKOUT_REQUEST });
      const { data } = await axios.post(`http://127.0.0.1:5003/api/cart/checkout`, {cartItems,restaurantId, totalPrice}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
      dispatch({ type: CHECKOUT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CHECKOUT_FAILURE, payload: error.message });
    }
  };
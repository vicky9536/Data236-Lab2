import axios from "axios";
import {
    CREATE_DISHES_REQUEST, CREATE_DISHES_SUCCESS, CREATE_DISHES_FAIL,
    GET_ONE_DISH_REQUEST, GET_ONE_DISH_SUCCESS, GET_ONE_DISH_FAIL,
    GET_DISH_DETAILS_REQUEST, GET_DISH_DETAILS_SUCCESS, GET_DISH_DETAILS_FAIL,
    UPDATE_DISHES_REQUEST, UPDATE_DISHES_SUCCESS, UPDATE_DISHES_FAIL,
    DELETE_DISHES_REQUEST, DELETE_DISHES_SUCCESS, DELETE_DISHES_FAIL } from "../constants/dishConstants";

const USER_SERVICE_URL = process.env.REACT_APP_USER_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.REACT_APP_ORDER_SERVICE_URL;
const RESTAURANT_SERVICE_URL = process.env.REACT_APP_RESTAURANT_SERVICE_URL;

export const createDish = (dishInput) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_DISHES_REQUEST });

        const { data } = await axios.post(`${RESTAURANT_SERVICE_URL}/api/dish/create`, dishInput , {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: CREATE_DISHES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_DISHES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getOneDish = (dishId) => async (dispatch) => {
    try {
        dispatch({ type: GET_ONE_DISH_REQUEST });
        const { data } = await axios.get(`${RESTAURANT_SERVICE_URL}/api/dish/get/${dishId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        console.log("getOneDish data-action:", data);
        dispatch({ type: GET_ONE_DISH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ONE_DISH_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getDishDetails = (dishId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_DISH_DETAILS_REQUEST });
            const { data } = await axios.get(`${RESTAURANT_SERVICE_URL}/api/dish/get/${dishId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: GET_DISH_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_DISH_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateDish = (dishId, dishInput) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_DISHES_REQUEST });
        const { data } = await axios.post(`${RESTAURANT_SERVICE_URL}/api/dish/update/${dishId}`, dishInput, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: UPDATE_DISHES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_DISHES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const deleteDish = (dishId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_DISHES_REQUEST });
        const { data } = await axios.delete(`${RESTAURANT_SERVICE_URL}/api/dish/delete/${dishId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: DELETE_DISHES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_DISHES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
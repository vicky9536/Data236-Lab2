import axios from "axios";
import {
    CREATE_DISHES_REQUEST, CREATE_DISHES_SUCCESS, CREATE_DISHES_FAIL,
    GET_ONE_DISH_REQUEST, GET_ONE_DISH_SUCCESS, GET_ONE_DISH_FAIL,
    GET_DISH_DETAILS_REQUEST, GET_DISH_DETAILS_SUCCESS, GET_DISH_DETAILS_FAIL,
    UPDATE_DISHES_REQUEST, UPDATE_DISHES_SUCCESS, UPDATE_DISHES_FAIL,
    DELETE_DISHES_REQUEST, DELETE_DISHES_SUCCESS, DELETE_DISHES_FAIL } from "../constants/dishConstants";

export const createDish = (dishInput) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_DISHES_REQUEST });

        const { data } = await axios.post(`http://127.0.0.1:5002/api/dish/create`, dishInput , {
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
        const { data } = await axios.get(`http://127.0.0.1:5002/api/dish/get/${dishId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
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
            const { data } = await axios.get(`http://127.0.0.1:5002/api/dish/get/${dishId}`, {
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
        const { data } = await axios.post(`http://127.0.0.1:5002/api/dish/update/${dishId}`, dishInput, {
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
        const { data } = await axios.delete(`http://127.0.0.1:5002/api/dish/delete/${dishId}`, {
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
import axios from "axios";
import {
    CREATE_DISHES_REQUEST, CREATE_DISHES_SUCCESS, CREATE_DISHES_FAIL,
    GET_ONE_DISH_REQUEST, GET_ONE_DISH_SUCCESS, GET_ONE_DISH_FAIL,
    UPDATE_DISHES_REQUEST, UPDATE_DISHES_SUCCESS, UPDATE_DISHES_FAIL,
    DELETE_DISHES_REQUEST, DELETE_DISHES_SUCCESS, DELETE_DISHES_FAIL } from "../constants/dishConstants";

export const createDish = (restaurant_Id, dishInput) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_DISHES_REQUEST });
        const { data } = await axios.post(`http://127.0.0.1:8383/dishes/create/${restaurant_Id}`, dishInput);
        dispatch({ type: CREATE_DISHES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_DISHES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getOneDish = (dishId, restaurant_Id) => async (dispatch) => {
    try {
        dispatch({ type: GET_ONE_DISH_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:8383/dishes/get/${restaurant_Id}/${dishId}`);
        console.log("data-action:",data);
        dispatch({ type: GET_ONE_DISH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ONE_DISH_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateDish = (dishId, restaurant_Id, dishInput) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_DISHES_REQUEST });
        const { data } = await axios.post(`http://127.0.0.1:8383/dishes/update/${restaurant_Id}/${dishId}`, dishInput);
        dispatch({ type: UPDATE_DISHES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_DISHES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const deleteDish = (dishId,restaurant_Id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_DISHES_REQUEST });
        const { data } = await axios.delete(`http://127.0.0.1:8383/dishes/delete/${restaurant_Id}/${dishId}`);
        dispatch({ type: DELETE_DISHES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_DISHES_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
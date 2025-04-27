import axios from "axios";
import { RESTAURANT_LIST_REQUEST, RESTAURANT_LIST_SUCCESS, RESTAURANT_LIST_FAIL} from "../constants/restaurantConstants";
import { REST_DISHES_LIST_REQUEST, REST_DISHES_LIST_SUCCESS, REST_DISHES_LIST_FAIL } from "../constants/restaurantConstants";

export const fetchRestaurants = () => async (dispatch) => {
    try {
        dispatch({ type: RESTAURANT_LIST_REQUEST });
        const { data } = await axios.get("http://127.0.0.1:5002/api/dashboard/restaurants");
        dispatch({ type: RESTAURANT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RESTAURANT_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const fetchRestDishes = (restaurantId) => async (dispatch) => {
    try {
        dispatch({ type: REST_DISHES_LIST_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:5002/api/dashboard/restaurants/${restaurantId}/dishes`);
        dispatch({
            type: REST_DISHES_LIST_SUCCESS,
            payload: { 
                restaurantId: restaurantId,
                dishes: data.dishes || [] 
            }
        });
    } catch (error) {
        dispatch({
            type: REST_DISHES_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

import axios from "axios";
import { FAVORITE_LIST_REQUEST, FAVORITE_LIST_SUCCESS, FAVORITE_LIST_FAIL } from "../constants/favoriteConstants";
import { FAVORITE_ADD_REQUEST, FAVORITE_ADD_SUCCESS, FAVORITE_ADD_FAIL } from "../constants/favoriteConstants";
import { FAVORITE_REMOVE_REQUEST, FAVORITE_REMOVE_SUCCESS, FAVORITE_REMOVE_FAIL } from "../constants/favoriteConstants";

export const getFavorites = (customer_Id) => async (dispatch) => {
    try {
        dispatch({ type: FAVORITE_LIST_REQUEST });
        const { data: favoriteData } = await axios.get(`http://127.0.0.1:8383/favorites/getFavorites`);
        console.log("Favorites:", favoriteData);
        const favoritesWithDetails = await Promise.all(
            favoriteData.map(async (favorite) => {
              const { data: restaurantData } = await axios.get(`http://127.0.0.1:8383/resDb/restaurants/dishes`);
              console.log("Restaurant:", restaurantData);
              return { ...favorite, restaurant: restaurantData };
            })
        );
        dispatch({ type: FAVORITE_LIST_SUCCESS, payload: favoritesWithDetails });
    } catch (error) {
        dispatch({
            type: FAVORITE_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const addFavorite = (customer_Id, restInput) => async (dispatch) => {
    try {
        dispatch({ type: FAVORITE_ADD_REQUEST });
        const { data } = await axios.post(`http://127.0.0.1:8383/favorites/addFavorite/${customer_Id}`, restInput);
        console.log("Added Favorite-actions:", data);
        dispatch({ type: FAVORITE_ADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FAVORITE_ADD_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const removeFavorite = (customer_Id, favorite_Id) => async (dispatch) => {
    try {
        dispatch({ type: FAVORITE_REMOVE_REQUEST });
        const { data } = await axios.delete(`http://127.0.0.1:8383/favorites/removeFavorite/${customer_Id}/${favorite_Id}`);
        dispatch({ type: FAVORITE_REMOVE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FAVORITE_REMOVE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};


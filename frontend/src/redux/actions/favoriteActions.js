import axios from "axios";
import { FAVORITE_LIST_REQUEST, FAVORITE_LIST_SUCCESS, FAVORITE_LIST_FAIL } from "../constants/favoriteConstants";
import { FAVORITE_ADD_REQUEST, FAVORITE_ADD_SUCCESS, FAVORITE_ADD_FAIL } from "../constants/favoriteConstants";
import { FAVORITE_REMOVE_REQUEST, FAVORITE_REMOVE_SUCCESS, FAVORITE_REMOVE_FAIL } from "../constants/favoriteConstants";

// Get Favorites
export const getFavorites = () => async (dispatch) => {
    try {
      dispatch({ type: FAVORITE_LIST_REQUEST });
  
      const { data: favoriteData } = await axios.get('http://127.0.0.1:8383/favorites/getFavorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
      dispatch({ type: FAVORITE_LIST_SUCCESS, payload: favoriteData });
    } catch (error) {
      dispatch({
        type: FAVORITE_LIST_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
};
  

// Add Favorite
export const addFavorite = (restInput) => async (dispatch) => {
    try {
        dispatch({ type: FAVORITE_ADD_REQUEST });
        const { data } = await axios.post('http://127.0.0.1:8383/favorites/addFavorite', 
            { restaurantId: restInput.restaurantId }, 
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            }
        );
        dispatch({ type: FAVORITE_ADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FAVORITE_ADD_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Remove Favorite
export const removeFavorite = (favorite_Id) => async (dispatch) => {
    try {
        dispatch({ type: FAVORITE_REMOVE_REQUEST });
        const { data } = await axios.delete(`http://127.0.0.1:8383/favorites/removeFavorite/${favorite_Id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch({ type: FAVORITE_REMOVE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FAVORITE_REMOVE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

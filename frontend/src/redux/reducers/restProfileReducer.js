import {
    GET_REST_PROFILE_REQUEST, GET_REST_PROFILE_SUCCESS, GET_REST_PROFILE_FAILURE,
    GET_MY_REST_PROFILE_REQUEST,GET_MY_REST_PROFILE_SUCCESS, GET_MY_REST_PROFILE_FAILURE,
    GET_FAVORITE_REST_PROFILE_REQUEST, GET_FAVORITE_REST_PROFILE_SUCCESS, GET_FAVORITE_REST_PROFILE_FAILURE,
    UPDATE_REST_PROFILE_REQUEST,UPDATE_REST_PROFILE_SUCCESS, UPDATE_REST_PROFILE_FAILURE,
  } from "../constants/restProfileConstants";
  
  // Reducer for getting a specific restaurant's profile
  const initialState = { loading: false, restaurant: null, error: null };
  
  export const getRestProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REST_PROFILE_REQUEST:
        return { loading: true, restaurant: null, error: null };
      case GET_REST_PROFILE_SUCCESS:
        return { loading: false, restaurant: action.payload, error: null };
      case GET_REST_PROFILE_FAILURE:
        return { loading: false, restaurant: null, error: action.payload };
      default:
        return state;
    }
  };
  
  // Reducer for getting the logged-in user's restaurant profile
  const initialStateMy = { loading: false, restaurant: null, error: null };
  
  export const getMyRestProfileReducer = (state = initialStateMy, action) => {
    switch (action.type) {
      case GET_MY_REST_PROFILE_REQUEST:
        return { loading: true, restaurant: null, error: null };
      case GET_MY_REST_PROFILE_SUCCESS:
        return { loading: false, restaurant: action.payload, error: null };
      case GET_MY_REST_PROFILE_FAILURE:
        return { loading: false, restaurant: null, error: action.payload };
      case UPDATE_REST_PROFILE_SUCCESS:
        return { loading: false, restaurant: action.payload, error: null };
      default:
        return state;
    }
  };

  // Reducer for getting a specific restaurant's favorite profile
  const initialStateFavorite = { loading: false, restaurants: {}, error: null };
  export const getFavoriteRestProfileReducer = (state = initialStateFavorite, action) => {
    switch (action.type) {
      case GET_FAVORITE_REST_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_FAVORITE_REST_PROFILE_SUCCESS:
        return { 
          loading: false, 
          restaurants: { 
            ...state.restaurants, 
            [action.payload._id]: action.payload 
          }, 
          error: null 
        };
      case GET_FAVORITE_REST_PROFILE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  // Reducer for updating the restaurant profile
  const initialStateUpdate = { loading: false, restaurant: null, error: null };
  
  export const updateRestProfileReducer = (state = initialStateUpdate, action) => {
    switch (action.type) {
      case UPDATE_REST_PROFILE_REQUEST:
        return { loading: true, restaurant: null, error: null };
      case UPDATE_REST_PROFILE_SUCCESS:
        return { loading: false, restaurant: action.payload, error: null };
      case UPDATE_REST_PROFILE_FAILURE:
        return { loading: false, restaurant: null, error: action.payload };
      default:
        return state;
    }
  };
  
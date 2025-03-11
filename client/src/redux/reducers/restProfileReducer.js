import { GET_REST_PROFILE_REQUEST, GET_REST_PROFILE_SUCCESS, GET_REST_PROFILE_FAILURE, 
    UPDATE_REST_PROFILE_REQUEST, UPDATE_REST_PROFILE_SUCCESS, UPDATE_REST_PROFILE_FAILURE } from "../constants/restProfileConstants";

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

const initialStateUpdate = { loading: false, restaurant: null, error: null };
export const updateRestProfileReducer = (state = initialStateUpdate, action) => {
    switch (action.type) {
        case UPDATE_REST_PROFILE_REQUEST:
            return { loading: true, restaurant: null, error: null };
        case UPDATE_REST_PROFILE_SUCCESS:
            console.log("action.payload: ", action.payload);
            return { loading: false, restaurant: action.payload, error: null };
        case UPDATE_REST_PROFILE_FAILURE:
            return { loading: false, restaurant: null, error: action.payload };
        default:
            return state;
    }
};
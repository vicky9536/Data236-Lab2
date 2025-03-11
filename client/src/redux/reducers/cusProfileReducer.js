import { GET_CUS_PROFILE_REQUEST, GET_CUS_PROFILE_SUCCESS, GET_CUS_PROFILE_FAILURE, 
    UPDATE_CUS_PROFILE_REQUEST, UPDATE_CUS_PROFILE_SUCCESS, UPDATE_CUS_PROFILE_FAILURE } from "../constants/cusProfileConstants";

const initialState = { loading: false, customer: null, error: null };
export const getCusProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUS_PROFILE_REQUEST:
            return { loading: true, customer: null, error: null };
        case GET_CUS_PROFILE_SUCCESS:
            return { loading: false, customer: action.payload, error: null };
        case GET_CUS_PROFILE_FAILURE:
            return { loading: false, customer: null, error: action.payload };
        default:
            return state;
    }
};

const initialStateUpdate = { loading: false, customer: null, error: null };
export const updateCusProfileReducer = (state = initialStateUpdate, action) => {
    switch (action.type) {
        case UPDATE_CUS_PROFILE_REQUEST:
            return { loading: true, customer: null, error: null };
        case UPDATE_CUS_PROFILE_SUCCESS:
            return { loading: false, customer: action.payload, error: null };
        case UPDATE_CUS_PROFILE_FAILURE:
            return { loading: false, customer: null, error: action.payload };
        default:
            return state;
    }
};
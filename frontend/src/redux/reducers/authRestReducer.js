import { RESTAURANT_LOGIN_REQUEST, RESTAURANT_LOGIN_SUCCESS, RESTAURANT_LOGIN_FAIL,
  RESTAURANT_LOGOUT_REQUEST, RESTAURANT_LOGOUT_SUCCESS, RESTAURANT_LOGOUT_FAIL,
  RESTAURANT_REGISTER_REQUEST, RESTAURANT_REGISTER_SUCCESS, RESTAURANT_REGISTER_FAIL,
} from "../constants/authRestConstants";

const initialState = { loading: false, restaurant: null, error: null };
export const restaurantLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESTAURANT_LOGIN_REQUEST:
            return { loading: true, restaurant: null, error: null };
        case RESTAURANT_LOGIN_SUCCESS:
            return { loading: false, restaurant: action.payload, error: null };
        case RESTAURANT_LOGIN_FAIL:
            return { loading: false, restaurant: null, error: action.payload };
        default:
            return state;
    }
};

const initialStateLogout = { loading: false, restaurant: null, error: null };
export const restaurantLogoutReducer = (state = initialStateLogout, action) => {
    switch (action.type) {
        case RESTAURANT_LOGOUT_REQUEST:
            return { ...state, loading: true };
        case RESTAURANT_LOGOUT_SUCCESS:
            return { ...state, loading: false, restaurant: null, error: null }; 
        case RESTAURANT_LOGOUT_FAIL:
            return { ...state, loading: false, restaurant: null, error: action.payload };
        default:
            return state;
    }
};

const initialStateRegister = { loading: false, restaurant: null, error: null };
export const restaurantRegisterReducer = (state = initialStateRegister, action) => {
    switch (action.type) {
        case RESTAURANT_REGISTER_REQUEST:
            return { loading: true, restaurant: null, error: null };
        case RESTAURANT_REGISTER_SUCCESS:
            return { loading: false, restaurant: action.payload, error: null };
        case RESTAURANT_REGISTER_FAIL:
            return { loading: false, restaurant: null, error: action.payload };
    default:
        return state;
    }
};
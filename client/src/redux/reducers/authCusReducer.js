    import { CUSTOMER_LOGIN_REQUEST, CUSTOMER_LOGIN_SUCCESS, CUSTOMER_LOGIN_FAIL,
        CUSTOMER_LOGOUT_REQUEST, CUSTOMER_LOGOUT_SUCCESS, CUSTOMER_LOGOUT_FAIL,
        CUSTOMER_REGISTER_REQUEST, CUSTOMER_REGISTER_SUCCESS, CUSTOMER_REGISTER_FAIL } from "../constants/authCusConstants";

    const initialState = { loading: false, customer: null, error: null };
    export const customerLoginReducer = (state = initialState, action) => {
        switch (action.type) {
          case CUSTOMER_LOGIN_REQUEST:
            return { loading: true, customer: null, error: null };
          case CUSTOMER_LOGIN_SUCCESS:
            return { loading: false, customer: action.payload, error: null };
          case CUSTOMER_LOGIN_FAIL:
            return { loading: false, customer: null, error: action.payload };
          case CUSTOMER_LOGOUT_SUCCESS:
            return { loading: false, customer: null, error: null };
          default:
            return state;
        }
    };
      
    const initialStateLogout = { loading: false, customer: null, error: null };
    export const customerLogoutReducer = (state = initialStateLogout, action) => {
        switch (action.type) {
            case CUSTOMER_LOGOUT_REQUEST:
                return { ...state, loading: true };
            case CUSTOMER_LOGOUT_SUCCESS:
                return { ...state, loading: false, customer: null, error: null };  // Reset customer state
            case CUSTOMER_LOGOUT_FAIL:
                return { ...state, loading: false, customer: null, error: action.payload };
            default:
                return state;
        }
    };

    const initialStateRegister = { loading: false, customer: null, error: null };
    export const customerRegisterReducer = (state = initialStateRegister, action) => {
        switch (action.type) {
            case CUSTOMER_REGISTER_REQUEST:
                return { loading: true, customer: null, error: null };
            case CUSTOMER_REGISTER_SUCCESS:
                return { loading: false, customer: action.payload, error: null };
            case CUSTOMER_REGISTER_FAIL:
                return { loading: false, customer: null, error: action.payload };
        default:
            return state;
        }
    };
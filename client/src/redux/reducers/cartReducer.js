import  { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE
    , GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
     DELETE_CART_REQUEST, DELETE_CART_SUCCESS, DELETE_CART_FAILURE, 
     CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from "../constants/cartConstants";

     const initialState = { loading: false, cartItems: [], error: null };
     export const addCartReducer = (state = initialState, action) => {
        switch (action.type) {
            case ADD_TO_CART_REQUEST:
                return { loading : true, cartItems: [], error: null };
            case ADD_TO_CART_SUCCESS:
                return { loading: false, cartItems: action.payload, error: null };
            case ADD_TO_CART_FAILURE:
                return { loading: false, cartItems: [], error: action.payload };
            default:
                return state;
        }
     }

     const initialStateGet = { loading: false, cartItems: [], error: null };
     export const getCartReducer = (state = initialStateGet, action) => {
        switch (action.type) {
            case GET_CART_REQUEST:
                return { loading: true, cartItems: [], error: null };
            case GET_CART_SUCCESS:
                return { loading: false, cartItems: action.payload, error: null };
            case GET_CART_FAILURE:
                return { loading: false, cartItems: [], error: action.payload };
            default:
                return state;
        }
     }

     const initialStateDelete = { loading: false, cartItems: [], error: null };
     export const deleteCartReducer = (state = initialStateDelete, action) => {
        switch (action.type) {
            case DELETE_CART_REQUEST:
                return { loading: true, cartItems: [], error: null };
            case DELETE_CART_SUCCESS:
                return { loading: false, cartItems: action.payload, error: null };
            case DELETE_CART_FAILURE:
                return { loading: false, cartItems: [], error: action.payload };
            default:
                return state;
        }
     }

     const initialStateCheckout = { loading: false, cartItems: [], error: null };
     export const checkoutReducer = (state = initialStateCheckout, action) => {
        switch (action.type) {
            case CHECKOUT_REQUEST:
                return { loading: true, cartItems: [], error: null };
            case CHECKOUT_SUCCESS:
                return { loading: false, cartItems: action.payload, error: null };
            case CHECKOUT_FAILURE:
                return { loading: false, cartItems: [], error: action.payload };
            default:
                return state;
        }
    }
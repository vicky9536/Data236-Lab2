import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILURE,
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE } from "../constants/orderConstants";

const initialState = {loading:false, orders: [], error: null};
export const orderGetReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return { loading: true, orders: null, error: null };
        case GET_ORDER_SUCCESS:
            console.log("orderGetReducer: ", action.payload);
            return { loading: false, orders: action.payload, error: null };
        case  GET_ORDER_FAILURE:
            return { loading: false, orders: null, error: action.payload };
        default:
            return state;
    }
};

const initialStateCreate = { loading: false, order: null, error: null };
export const orderCreateReducer = (state = initialStateCreate, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { loading: true, order: null, error: null };
        case CREATE_ORDER_SUCCESS:
            return { loading: false, order: action.payload, error: null };
        case  CREATE_ORDER_FAILURE:
            return { loading: false, order: null, error: action.payload };
        default:
            return state;
    }
};

const initialStateUpdate = { loading: false, order: null, error: null };
export const orderUpdateReducer = (state = initialStateUpdate, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            return { loading: true, order: null, error: null };
        case UPDATE_ORDER_SUCCESS:
            return { loading: false, order: action.payload, error: null };
        case UPDATE_ORDER_FAILURE:
            return { loading: false, order: null, error: action.payload };
        default:
            return state;
    }
};

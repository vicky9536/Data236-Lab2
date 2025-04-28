import { GET_CUS_ORDER_REQUEST, GET_CUS_ORDER_SUCCESS, GET_CUS_ORDER_FAILURE,
    GET_RES_ORDER_REQUEST, GET_RES_ORDER_SUCCESS, GET_RES_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAILURE,
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE,
    CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE } from "../constants/orderConstants";

const initialState = {loading:false, orders: [], error: null};

export const getCustomerOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUS_ORDER_REQUEST:
            return { loading: true, orders: [], error: null };
        case GET_CUS_ORDER_SUCCESS:
            return { loading: false, orders: action.payload, error: null };
        case GET_CUS_ORDER_FAILURE:
            return { loading: false, orders: [], error: action.payload };
        default:
            return state;
    }
};

const initialStateGet = {loading:false, orders: [], error: null};
export const getRestaurantOrdersReducer = (state = initialStateGet, action) => {
    switch (action.type) {
        case GET_RES_ORDER_REQUEST:
            return { loading: true, orders: [], error: null };
        case GET_RES_ORDER_SUCCESS:
            return { loading: false, orders: action.payload, error: null };
        case GET_RES_ORDER_FAILURE:
            return { loading: false, orders: [], error: action.payload };
        default:
            return state;
    }
};
const initialStateGetById = {loading:false, order: null, error: null};
export const getOrderByIdReducer = (state = initialStateGetById, action) => {
    switch (action.type) {
        case GET_ORDER_BY_ID_REQUEST:
            return { loading: true, order: null, error: null };
        case GET_ORDER_BY_ID_SUCCESS:
            return { loading: false, order: action.payload, error: null };
        case GET_ORDER_BY_ID_FAILURE:
            return { loading: false, order: null, error: action.payload };
        default:
            return state;
    }
}

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

const initialStateCancel = { loading: false, canceledOrder: null, error: null };
export const orderCancelReducer = (state = initialStateCancel, action) => {
    switch (action.type) {
        case CANCEL_ORDER_REQUEST:
            return { loading: true, canceledOrder: null, error: null };
        case CANCEL_ORDER_SUCCESS:
            return { loading: false, canceledOrder: action.payload, error: null };
        case CANCEL_ORDER_FAILURE:
            return { loading: false, canceledOrder: null, error: action.payload };
        default:
            return state;
    }
};

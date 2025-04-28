import { CREATE_DISHES_REQUEST, CREATE_DISHES_SUCCESS, CREATE_DISHES_FAIL,
    GET_ONE_DISH_REQUEST, GET_ONE_DISH_SUCCESS, GET_ONE_DISH_FAIL,
    GET_DISH_DETAILS_REQUEST, GET_DISH_DETAILS_SUCCESS, GET_DISH_DETAILS_FAIL,
    UPDATE_DISHES_REQUEST, UPDATE_DISHES_SUCCESS, UPDATE_DISHES_FAIL,
    DELETE_DISHES_REQUEST, DELETE_DISHES_SUCCESS, DELETE_DISHES_FAIL} from '../constants/dishConstants';

const initialState = {loading:false, dish: null, error: null};
export const dishAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_DISHES_REQUEST:
            return { loading: true, dish: null, error: null };
        case CREATE_DISHES_SUCCESS:
            return { loading: false, dish: action.payload, error: null };
        case CREATE_DISHES_FAIL:
            return { loading: false, dish: null, error: action.payload };
        default:
            return state;
    }
};

const initialStateGet = { loading: false, dish: null, error: null };
export const dishGetReducer = (state = initialStateGet, action) => {
    switch (action.type) {
        case GET_ONE_DISH_REQUEST:
            return { loading: true, dish: null, error: null };
        case GET_ONE_DISH_SUCCESS:
            console.log("getOneDish data-reducer:", action.payload);
            return { loading: false, dish: action.payload, error: null };
        case GET_ONE_DISH_FAIL:
            return { loading: false, dish: null, error: action.payload };
        default:
            return state;
    }
};

const initialStateDetails = { loading: false, dishes: {}, error: null };

export const dishDetailsReducer = (state = initialStateDetails, action) => {
    switch (action.type) {
        case GET_DISH_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DISH_DETAILS_SUCCESS:
            return { 
                loading: false, 
                dishes: { 
                    ...state.dishes, 
                    [action.payload._id]: action.payload 
                }, 
                error: null 
            };
        case GET_DISH_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


const initialStateUpdate = { loading: false, dish: null, error: null };
export const dishUpdateReducer = (state = initialStateUpdate, action) => {
    switch (action.type) {
        case UPDATE_DISHES_REQUEST:
            return { loading: true, dish: null, error: null };
        case UPDATE_DISHES_SUCCESS:
            return { loading: false, dish: action.payload, error: null };
        case UPDATE_DISHES_FAIL:
            return { loading: false, dish: null, error: action.payload };
        default:
            return state;
    }
};

const initialStateDelete = { loading: false, dish: null, error: null };
export const dishDeleteReducer = (state = initialStateDelete, action) => {
    switch (action.type) {
        case DELETE_DISHES_REQUEST:
            return { loading: true, dish: null, error: null };
        case DELETE_DISHES_SUCCESS:
            return { loading: false, dish: action.payload, error: null };
        case DELETE_DISHES_FAIL:
            return { loading: false, dish: null, error: action.payload };
        default:
            return state;
    }
};

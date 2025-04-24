import { RESTAURANT_LIST_REQUEST, RESTAURANT_LIST_SUCCESS, RESTAURANT_LIST_FAIL,
    REST_DISHES_LIST_REQUEST, REST_DISHES_LIST_SUCCESS, REST_DISHES_LIST_FAIL,
} from "../constants/restaurantConstants";

const initialState = { loading: false, restaurants: [], error: null };

export const restaurantListReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESTAURANT_LIST_REQUEST:
            return { loading: true, restaurants: null, error: null };
        case RESTAURANT_LIST_SUCCESS:
            return { loading: false, restaurants: action.payload, error: null };
        case RESTAURANT_LIST_FAIL:
            return { loading: false, restaurants: [], error: action.payload };
        default:
            return state;
    }
};

const initialStateDishes = { loading: false, dishesByRestaurant: {}, error: null };
  
  export const restDishesListReducer = (state = initialStateDishes, action) => {
    switch (action.type) {
      case REST_DISHES_LIST_REQUEST:
        return { ...state, loading: true, error: null };
      case REST_DISHES_LIST_SUCCESS:
        return { ...state, loading: false,
          dishesByRestaurant: {
            ...state.dishesByRestaurant,
            [action.payload.restaurant_Id]: action.payload.Dishes,
          },
          error: null,
        };
      case REST_DISHES_LIST_FAIL:
        return { ...state, loading: false, dishesByRestaurant: {}, error: action.payload };
      default:
        return state;
    }
  };
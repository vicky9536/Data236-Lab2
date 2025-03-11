import { FAVORITE_LIST_REQUEST, FAVORITE_LIST_SUCCESS, FAVORITE_LIST_FAIL,
    FAVORITE_ADD_REQUEST, FAVORITE_ADD_SUCCESS, FAVORITE_ADD_FAIL,
    FAVORITE_REMOVE_REQUEST, FAVORITE_REMOVE_SUCCESS, FAVORITE_REMOVE_FAIL,
 } from "../constants/favoriteConstants";

 const initialState = { loading: false, favorites: [], error: null };
 export const favoriteListReducer = (state = initialState, action) => {
     switch (action.type) {
         case FAVORITE_LIST_REQUEST:
             return { loading: true, favorites: null, error: null };
         case FAVORITE_LIST_SUCCESS:
            console.log("Favorites:", action.payload);
             return { loading: false, favorites: action.payload, error: null };
         case FAVORITE_LIST_FAIL:
             return { loading: false, favorites: [], error: action.payload };
         default:
             return state;
     }
 };

 const initialStateAdd = { loading: false, favorite: null, error: null };
 export const favoriteAddReducer = (state = initialStateAdd, action) => {
     switch (action.type) {
         case FAVORITE_ADD_REQUEST:
             return { loading: true, favorite: null, error: null };
         case FAVORITE_ADD_SUCCESS:
             return { loading: false, favorite: action.payload, error: null };
         case FAVORITE_ADD_FAIL:
             return { loading: false, favorite: null, error: action.payload };
    default:
        return state;
     };
};

const initialStateRemove = { loading: false, favorites: null, error: null };
export const favoriteRemoveReducer = (state = initialStateRemove, action) => {
    switch (action.type) {
        case FAVORITE_REMOVE_REQUEST:
            return { loading: true, favorites: null, error: null };
        case FAVORITE_REMOVE_SUCCESS:
            return { loading: false, favorites: action.payload, error: null };
        case FAVORITE_REMOVE_FAIL:
            return { loading: false, favorites: null, error: action.payload };
    default:
        return state;
    };
};
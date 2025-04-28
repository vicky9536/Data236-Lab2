import { combineReducers } from "redux";
import { restaurantListReducer, restDishesListReducer } from "./restaurantReducer";
import { favoriteAddReducer, favoriteListReducer, favoriteRemoveReducer } from "./favoriteReducer";
import { customerLoginReducer, customerLogoutReducer, customerRegisterReducer } from "./authCusReducer";
import { getCusProfileReducer, updateCusProfileReducer, getCusProfileOrderReducer } from "./cusProfileReducer";
import { getCartReducer, addCartReducer, deleteCartReducer, 
    updateCartItemQuantityReducer, checkoutReducer} from "./cartReducer";
import { restaurantLoginReducer, restaurantLogoutReducer, restaurantRegisterReducer } from "./authRestReducer";
import { getRestProfileReducer, getMyRestProfileReducer, updateRestProfileReducer, getFavoriteRestProfileReducer } from "./restProfileReducer";
import { dishAddReducer, dishGetReducer, dishDetailsReducer, dishUpdateReducer, dishDeleteReducer } from "./dishReducer";
import { getCustomerOrdersReducer, getRestaurantOrdersReducer, orderCreateReducer, 
    orderUpdateReducer, getOrderByIdReducer, orderCancelReducer } from "./orderReducer";

const rootReducer = combineReducers({
    restaurantList: restaurantListReducer,
    restDishesList: restDishesListReducer,
    favoriteAdd: favoriteAddReducer,
    favoriteList: favoriteListReducer,
    favoriteRemove: favoriteRemoveReducer,
    customerLogin: customerLoginReducer,
    customerLogout: customerLogoutReducer,
    customerRegister: customerRegisterReducer,
    getCusProfile: getCusProfileReducer,
    updateCusProfile: updateCusProfileReducer,
    getCusProfileOrder: getCusProfileOrderReducer,
    cartList: getCartReducer,
    cartAdd: addCartReducer,
    cartDelete: deleteCartReducer,  
    cartUpdate: updateCartItemQuantityReducer,
    checkout: checkoutReducer,
    restaurantLogin: restaurantLoginReducer,
    restaurantLogout: restaurantLogoutReducer,
    restaurantRegister: restaurantRegisterReducer,
    getRestProfile: getRestProfileReducer,
    getMyRestProfile: getMyRestProfileReducer,
    getFavoriteRestProfile: getFavoriteRestProfileReducer,
    updateRestProfile: updateRestProfileReducer,
    dishAdd: dishAddReducer,
    dishGet: dishGetReducer,
    dishDetails: dishDetailsReducer,
    dishUpdate: dishUpdateReducer,
    dishDelete: dishDeleteReducer,
    getCusOrder: getCustomerOrdersReducer,
    getResOrder: getRestaurantOrdersReducer,
    getOrderById: getOrderByIdReducer,
    orderCreate: orderCreateReducer,
    orderUpdate: orderUpdateReducer,
    orderCancel: orderCancelReducer
});

export default rootReducer;

import { combineReducers } from "redux";
import { restaurantListReducer, restDishesListReducer } from "./restaurantReducer";
import { favoriteAddReducer, favoriteListReducer, favoriteRemoveReducer } from "./favoriteReducer";
import { customerLoginReducer, customerLogoutReducer, customerRegisterReducer } from "./authCusReducer";
import { getCusProfileReducer, updateCusProfileReducer } from "./cusProfileReducer";
import { getCartReducer, addCartReducer, deleteCartReducer } from "./cartReducer";
import  { restaurantLoginReducer, restaurantLogoutReducer, restaurantRegisterReducer } from "./authRestReducer";
import { getRestProfileReducer, updateRestProfileReducer } from "./restProfileReducer";
import { dishAddReducer, dishGetReducer, dishUpdateReducer, dishDeleteReducer } from "./dishReducer";
import { orderGetReducer, orderCreateReducer, orderUpdateReducer } from "./orderReducer";

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
    cartList: getCartReducer,
    cartAdd: addCartReducer,
    cartDelete: deleteCartReducer,  
    restaurantLogin: restaurantLoginReducer,
    restaurantLogout: restaurantLogoutReducer,
    restaurantRegister: restaurantRegisterReducer,
    getRestProfile: getRestProfileReducer,
    updateRestProfile: updateRestProfileReducer,
    dishAdd: dishAddReducer,
    dishGet: dishGetReducer,
    dishUpdate: dishUpdateReducer,
    dishDelete: dishDeleteReducer,
    orderGet: orderGetReducer,
    orderCreate: orderCreateReducer,
    orderUpdate: orderUpdateReducer,
});

export default rootReducer;

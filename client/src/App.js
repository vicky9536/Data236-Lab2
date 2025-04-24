
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CustomerLogin from './components/Login/CustomerLogin';
import RegistrationType from './components/Signup/RegistrationType';
import CustomerSignup from './components/Signup/CustomerSignup';
import RestaurantSignup from './components/Signup/RestaurantSignup';
import CustomerDashboard from './components/Home/CustomerDashboard';
import RestaurantPage from './components/Profile/RestaurantPage';
import CustomerProfile from './components/Profile/CustomerProfile';
import UpdateProfile from './components/Profile/UpdateProfile';
import Logout from './components/Login/Logout';
import LoginType from './components/Login/LoginType';
import Cart from './components/Cart/Cart';
import Favorites from './components/Profile/Favorites';
import RestaurantLogin from './components/Login/RestaurantLogin';
import RestaurantDashboard from './components/Home/RestaurantDashboard';
import UpdateRestaurant from './components/Home/UpdateRestaurant';
import EditDish from './components/Menu/EditDish';
import AddDish from './components/Menu/AddDish';
import Order from './components/Order/OrderOnRestaurant';
import UpdateOrder from './components/Order/UpdateOrder';
import ViewCusProfile from './components/Order/ViewCusProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration_type" element={<RegistrationType />} />
        <Route path="/login_type" element={<LoginType />} />
        <Route path="/customer_login" element={<CustomerLogin />} />
        <Route path="/customer_register" element={<CustomerSignup />} />
        <Route path="/customer_dashboard" element={<CustomerDashboard />} />
        <Route path="/customer_dashboard/:restaurant_name" element={<RestaurantPage />} />
        <Route path="/customer_dashboard/profile" element={<CustomerProfile />} />
        <Route path="/customer_dashboard/profile/update" element={<UpdateProfile />} />
        <Route path="/customer_dashboard/favorites" element={<Favorites />} />
        <Route path="/customer_dashboard/cart" element={<Cart />} />
        <Route path="/restaurant_login" element={<RestaurantLogin />} />
        <Route path="/restaurant_register" element={<RestaurantSignup />} />
        <Route path="/restaurant_dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurant/profile/update" element={<UpdateRestaurant />} />
        <Route path="/restaurant/edit_dish/:dish_name" element={<EditDish />} />
        <Route path="/restaurant/add_dish/:dish_name" element={<AddDish />} />
        <Route path="/restaurant/order" element={<Order />} />
        <Route path="/restaurant/order/edit_order/:order_Id" element={<UpdateOrder />} />
        <Route path="/restaurant/order/view_cus_profile/:order_Id" element={<ViewCusProfile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;

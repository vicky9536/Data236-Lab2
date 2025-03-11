
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
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
import Order from './components/Order/Order';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login_type" element={<LoginType />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer_register" element={<CustomerSignup />} />
        <Route path="/restaurant_register" element={<RestaurantSignup />} />
        <Route path="/customer_dashboard" element={<CustomerDashboard />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/customer/:id" element={<CustomerProfile />} />
        <Route path="/customer/:id/update" element={<UpdateProfile />} />
        <Route path="/customer/:id/favorites" element={<Favorites />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/restaurant_login" element={<RestaurantLogin />} />
        <Route path="/restaurant_dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurant/edit_profile/:id" element={<UpdateRestaurant />} />
        <Route path="/restaurant/edit_dish/:dish_Id" element={<EditDish />} />
        <Route path="/restaurant/add_dish/:dish_Id" element={<AddDish />} />
        <Route path="/restaurant/order" element={<Order />} />
      </Routes>
    </Router>
  );
};

export default App;

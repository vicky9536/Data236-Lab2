import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { getFavorites, removeFavorite } from '../../redux/actions/favoriteActions';
import { getFavoriteRestProfile } from '../../redux/actions/restProfileActions';

const FavoriteRestaurants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [showToast, setShowToast] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState({}); 

  const restaurants = useSelector((state) => state.favoriteList.restaurants);
  const restaurantDetailsState = useSelector((state) => state.getFavoriteRestProfile);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  console.log("Favorites:", restaurants);
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (restaurants && restaurants.length > 0) {
        const newRestaurantDetails = { ...restaurantDetails};
        for (const restaurant of restaurants) {
          if (!restaurantDetails[restaurant]) {
            console.log("Fetching restaurant details for:", restaurant.restaurantId);
            dispatch(getFavoriteRestProfile(restaurant.restaurantId));
          }
        }
      }
    };

    fetchRestaurantDetails();
  }, [restaurants, dispatch, restaurantDetails]);


  console.log("Restaurants Details:", restaurantDetails); 

  const handleRemoveFavorite = (restaurantId) => {
    dispatch(removeFavorite(restaurantId));
    setToastMessage('Restaurant removed from favorites');
    setToastVariant('success');
    setShowToast(true);
    setRefresh(!refresh);
  }

  const handleCardClick = (restaurantId, e) => {
    e.stopPropagation();
    navigate(`/restaurant/${restaurantId}`);
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Favorite Restaurants</h2>

    </div>
  );
};

export default FavoriteRestaurants;

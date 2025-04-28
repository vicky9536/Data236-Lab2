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
        for (const restaurant of restaurants) {
          if (!restaurantDetails[restaurant.restaurantId]) {
            console.log("Fetching restaurant details for:", restaurant.restaurantId);
            const details = await dispatch(getFavoriteRestProfile(restaurant.restaurantId));
            if (details && details.payload) {
              setRestaurantDetails(prev => ({
                ...prev,
                [restaurant.restaurantId]: details.payload
              }));
            }
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
    const restaurantName = restaurantDetailsState.restaurants[restaurantId]?.name;
    if (restaurantName) {
      navigate(`/customer_dashboard/${restaurantName}`);
    } else {
      console.error("Restaurant name not found for restaurantId:", restaurantId);
    }
  };
  

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Favorite Restaurants</h2>
      {restaurants && restaurants.length > 0 ? (
        <Row>
          {restaurants.map((restaurant, index) => {
            const details = restaurantDetailsState.restaurants[restaurant.restaurantId];
            return (
              <Col key={index} md={6} lg={4} className="mb-5 d-flex flex-column align-items-center">
                {/* Wrapper Div */}
                <div style={{ width: '100%', maxWidth: '350px' }}>
                  <Card 
                    className="shadow-sm" 
                    style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={(e) => handleCardClick(restaurant.restaurantId, e)}
                  >
                    {/* Image */}
                    {details?.image_url ? (
                      <Card.Img 
                        variant="top" 
                        src={details.image_url} 
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    ) : (
                      <Card.Img 
                        variant="top" 
                        src="https://via.placeholder.com/400x200?text=Restaurant" 
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    
                    {/* Divider Line */}
                    <div style={{ borderTop: '1px solid #dee2e6' }}></div>

                    {/* Name + Button on the same line */}
                    <Card.Body className="py-2 px-3 d-flex justify-content-between align-items-center">
                      <Card.Title style={{ fontSize: '1.1rem', marginBottom: '0', fontWeight: 'bold' }}>
                        {details?.name || 'Restaurant'}
                      </Card.Title>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleRemoveFavorite(restaurant.restaurantId);
                        }}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p className="text-center">No favorite restaurants yet.</p>
      )}
    </div>
  );
};

export default FavoriteRestaurants;

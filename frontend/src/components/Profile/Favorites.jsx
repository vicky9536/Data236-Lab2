import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { getFavorites, removeFavorite } from '../../redux/actions/favoriteActions';
import { getFavoriteRestProfile } from '../../redux/actions/restProfileActions';
import Layout from '../Layout/Layout';

const FavoriteRestaurants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const restaurants = useSelector((state) => state.favoriteList.restaurants);
  const restaurantDetailsState = useSelector((state) => state.getFavoriteRestProfile);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (restaurants && restaurants.length > 0) {
        for (const restaurant of restaurants) {
          if (!restaurantDetails[restaurant.restaurantId]) {
            const details = await dispatch(getFavoriteRestProfile(restaurant.restaurantId));
            if (details && details.payload) {
              setRestaurantDetails((prev) => ({
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

  const handleRemoveFavorite = async (restaurantId, e) => {
    e.stopPropagation();
    await dispatch(removeFavorite(restaurantId));

  };

  const handleCardClick = (restaurantId) => {
    const restaurantName = restaurantDetailsState.restaurants[restaurantId]?.name;
    if (restaurantName) {
      navigate(`/customer_dashboard/${encodeURIComponent(restaurantName)}`);
    }
  };

  return (
    <Layout isLoggedInDashboard={true} showButtons={false} variant="dashboard">
      <Container className="mt-4">
        <h2 className="text-center mb-4">My Favorite Restaurants</h2>

        {restaurants && restaurants.length > 0 ? (
          <Row>
            {restaurants.map((restaurant) => {
              const details = restaurantDetailsState.restaurants[restaurant.restaurantId];
              return (
                <Col key={restaurant.restaurantId} md={4} className="mb-4">
                  <Card
                    onClick={() => handleCardClick(restaurant.restaurantId)}
                    style={{ cursor: 'pointer' }}
                    className="shadow-sm"
                  >
                    <Card.Img
                      variant="top"
                      src={details?.image_url || 'https://via.placeholder.com/400x200?text=Restaurant'}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <Card.Title className="mb-0" style={{ fontSize: '1rem' }}>
                        {details?.name || 'Restaurant'}
                      </Card.Title>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => handleRemoveFavorite(restaurant._id, e)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <p className="text-center">No favorite restaurants yet.</p>
        )}
      </Container>
    </Layout>
  );
};

export default FavoriteRestaurants;

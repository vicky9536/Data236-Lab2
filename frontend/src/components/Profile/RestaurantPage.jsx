import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestDishes } from '../../redux/actions/restaurantActions';
import { addFavorite } from '../../redux/actions/favoriteActions';
import { addToCart } from '../../redux/actions/cartActions';
import { Card, Container, Row, Col, Button, Toast, ToastContainer } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import './RestaurantPage.css';

const RestaurantPage = () => {
  const { restaurant_name } = useParams();
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurantList.restaurants);
  const { loading, dishesByRestaurant, error } = useSelector((state) => state.restDishesList);

  const restaurant = restaurants?.find((r) => r.name === restaurant_name);
  const dishes = dishesByRestaurant?.[restaurant?.id] || [];

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(fetchRestDishes(restaurant.id));
    }
  }, [restaurant, dispatch]);

  if (!restaurant) {
    return <Layout variant="dashboard" isLoggedInDashboard={true}><div>Restaurant not found!</div></Layout>;
  }

  const {
    name,
    description,
    location,
    timings,
    image_url,
    contact_info
  } = restaurant;

  const handleAddToFavorites = () => {
    const restInput = { restaurantId: restaurant.id };
    dispatch(addFavorite(restInput));
    setToastMessage(`Restaurant "${restaurant.name}" added to favorites!`);
    setShowToast(true);
  };

  const handleAddToCart = (dish_Id) => {
    const cartInput = {
      dish_Id,
      quantity: 1,
      restaurant_Id: restaurant.id,
    };
    dispatch(addToCart(cartInput));
    const dish = dishes.find(d => d.id === dish_Id);
    setToastMessage(`"${dish?.name}" added to cart!`);
    setShowToast(true);
  };

  return (
    <Layout variant="dashboard" isLoggedInDashboard={true}>
      <div className="restaurant-page">
        <Container className="mt-5">
          <Row className="text-center">
            <Col>
              <img src={image_url} alt={name} className="restaurant-image" />
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <h2 className="restaurant-name">{name}</h2>
              <p className="restaurant-description">{description || 'No description available.'}</p>
              <p className="restaurant-location">{location || 'No location available.'}</p>
              <p className="restaurant-timings">{timings || 'No timings available.'}</p>
              <p className="restaurant-contact">{contact_info || 'No contact info available.'}</p>
            </Col>
          </Row>

          <Row className="text-center mb-4">
            <Col>
              <Button variant="success" onClick={handleAddToFavorites} className="add-to-favorites-btn">
                Add to Favorites
              </Button>
            </Col>
          </Row>

          {loading && <p className="text-center text-primary">Loading...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          <Row className="mt-5">
            <Col>
              <h3 className="text-center">Menu</h3>
              {dishes.length > 0 ? (
                <Row>
                  {dishes.map((dish, index) => (
                    <Col md={6} lg={4} key={index} className="mb-4">
                      <Card className="dish-card shadow-sm">
                        <Card.Img variant="top" src={dish.image_url || '/images/default-dish.jpg'} className="dish-image" />
                        <Card.Body>
                          <Card.Title>{dish.name}</Card.Title>
                          <Card.Text>{dish.description}</Card.Text>
                          <Card.Text>
                            <strong>Price:</strong> ${dish.price}
                          </Card.Text>
                          <Button onClick={() => handleAddToCart(dish.id)} variant="primary" className="add-to-cart-btn">
                            Add to Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-center">No menu available for this restaurant.</p>
              )}
            </Col>
          </Row>
        </Container>

        <ToastContainer position="bottom-end" className="p-3">
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </Layout>
  );
};

export default RestaurantPage;

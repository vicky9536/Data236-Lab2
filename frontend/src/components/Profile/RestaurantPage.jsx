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
  
  const [toastVariant, setToastVariant] = useState('danger');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(fetchRestDishes(restaurant.id));
    }
  }, [restaurant, dispatch]);

  const favoriteError = useSelector((state) => state.favoriteAdd.error);
  const cartError = useSelector((state) => state.cartAdd.error);

  useEffect(() => {
    if (favoriteError) {
      setToastMessage(`Failed to add to favorites: ${favoriteError}`);
      setToastVariant('danger');
      setShowToast(true);
    }
  }, [favoriteError]);

  useEffect(() => {
    if (cartError) {
      setToastMessage(`Failed to add to cart: ${cartError}`);
      setToastVariant('danger');
      setShowToast(true);
    }
  }, [cartError]);

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
    setToastVariant('success');
    setShowToast(true);
  };
  
  const handleAddToCart = (dishId) => {
    const cartInput = {
      dishId: dishId,
      quantity: 1,
      restaurantId: restaurant.id,
    };
    dispatch(addToCart(cartInput));
    const dish = dishes.find(d => d.id === dishId);
    setToastMessage(`Successfully added to cart!`);
    setToastVariant('success');
    setShowToast(true);
  };

  // Inline style for ToastContainer to center it on the page
  const toastContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1050,
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
                          <Button onClick={() => handleAddToCart(dish._id)} variant="primary" className="add-to-cart-btn"
                            style={{ marginLeft: '0px'}}>
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

        <ToastContainer style={toastContainerStyle}>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastVariant}>
            <Toast.Header>
              <strong className="me-auto">{toastVariant === 'success' ? 'Success' : 'Error'}</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </Layout>
  );
};

export default RestaurantPage;

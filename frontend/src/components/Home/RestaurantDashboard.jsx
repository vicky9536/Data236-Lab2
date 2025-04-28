import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getMyRestProfile } from '../../redux/actions/restProfileActions';
import { fetchRestDishes } from '../../redux/actions/restaurantActions';
import { deleteDish, getOneDish } from '../../redux/actions/dishActions';
import Layout from '../Layout/Layout';
import './Home.css';

const RestaurantDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { restaurant } = useSelector((state) => state.getMyRestProfile);
  const { dishesByRestaurant, loading, error } = useSelector((state) => state.restDishesList);

  const [toastVariant, setToastVariant] = useState('danger');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [refresh, setRefresh] = useState(false);

  const dishes = restaurant ? (dishesByRestaurant?.[restaurant.id] || []) : [];

  useEffect(() => {
    dispatch(getMyRestProfile());
  }, [dispatch, refresh]);

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(fetchRestDishes(restaurant.id));
    }
  }, [dispatch, restaurant?.id, refresh]);

  const handleEditDish = (dish) => {
    navigate(`/restaurant/edit_dish/${dish._id}`);
  };

  const handleDeleteDish = async (dishId) => {
    try {
      console.log('Deleting dish with ID:', dishId);
      await dispatch(deleteDish(dishId));
      dispatch(fetchRestDishes(restaurant.id));
      setToastMessage('Dish deleted successfully!');
      setToastVariant('success');
      setShowToast(true);
      setRefresh((prev) => !prev);
    } catch (error) {
      setToastMessage('Failed to delete dish!');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  const handleEditProfile = () => {
    navigate('/restaurant/profile/update');  
  };

  const handleAddDish = () => {
    navigate('/restaurant/add_dish');
  };

  const toastContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1050,
  };

  if (!restaurant) {
    return (
      <Layout variant="restaurant_dashboard" isLoggedInDashboard={true}>
        <div>Restaurant not found!</div>
      </Layout>
    );
  }

  const {
    name,
    description,
    location,
    timings,
    image_url,
    contact_info,
  } = restaurant;

  return (
    <Layout variant="restaurant_dashboard" isLoggedInDashboard={true}>
      <div className="restaurant-page">
        <Container className="mt-5">
          <Row className="text-center">
            <Col>
              <img src={image_url || '/images/default-restaurant.jpg'} alt={name} className="restaurant-image" />
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

          {/* Edit Profile and Add Dish Buttons Positioned in the Middle */}
          <Row className="text-center">
            <Col>
              <Button variant="outline-primary" onClick={handleEditProfile}>
                Edit Profile
              </Button>
              <Button variant="outline-success" onClick={handleAddDish} className="ms-3">
                Add Dish
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
                          <Card.Text>
                            <strong>Category:</strong> {dish.category}
                          </Card.Text>
                          <div className="d-flex justify-content-between">
                            <Button variant="outline-primary" onClick={() => handleEditDish(dish)}>
                              Edit
                            </Button>
                            <Button variant="outline-danger" onClick={() => handleDeleteDish(dish._id)}>
                              Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-center">No dishes available for your restaurant.</p>
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

export default RestaurantDashboard;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRestProfile, updateRestProfile } from '../../redux/actions/restProfileActions';
import { fetchRestDishes } from '../../redux/actions/restaurantActions';
import { deleteDish } from '../../redux/actions/dishActions';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const RestaurantDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const restaurant_Id = useSelector((state) => state.restaurantLogin.restaurant.id);
  
    const { loading, dishesByRestaurant, error } = useSelector(
      (state) => state.restDishesList
    );
    const dishes = dishesByRestaurant?.[restaurant_Id] || [];
    const [refresh, setRefresh] = useState(false);
  
    useEffect(() => {
      if (restaurant_Id) {
        dispatch(fetchRestDishes(restaurant_Id));
      }
    }, [restaurant_Id, dispatch, refresh]);
  
    const restaurant = useSelector((state) => state.getRestProfile.restaurant);
  
    console.log("dishes:", dishes);
    useEffect(() => {
      if (restaurant_Id) {
        dispatch(getRestProfile(restaurant_Id));
      }
    }, [dispatch, restaurant_Id, refresh]);
  
    // Ensure that hooks are called before the early return
    if (!restaurant) {
      return <div>Restaurant not found!</div>;
    }
  
    const { name, description, location, timings, image_url, contact_info } = restaurant;
  
    const handleLogoutClick = async (e) => {
      e.preventDefault();
      navigate("/");
    };
  
    const handleEditProfileClick = async () => {
      navigate(`/restaurant/edit_profile/${restaurant.id}`);
    };
  
    const handleViewOrderClick = async () => {
      navigate("/restaurant/order");
    };

    const handleEditDish = (dish) => {
        navigate(`/restaurant/edit_dish/${dish.id}`);
    };
  
    const handleAddDish = async (restaurant_Id) => {
      navigate(`/restaurant/add_dish/${restaurant_Id}`);
    };

    const handleDeleteDish = async (dishId,restaurant_Id) => {
        console.log("Deleting dish with ID:", dishId);
      try {
        await dispatch(deleteDish(dishId,restaurant_Id));
        console.log("Dish deleted successfully");
        setRefresh(!refresh); 
      } catch (error) {
        console.error("Error deleting dish:", error);
      }
    };
  
    return (
      <div className="restaurant-page">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
          <div className="container-fluid">
            <a className="navbar-brand">
              <img
                src="/images/ubereats_logo.png"
                alt="Uber Eats Logo"
                style={{ height: '20px' }}
              />
            </a>
            <div className="d-flex">
              <button onClick={handleViewOrderClick}
              className="btn btn-outline-dark px-4 rounded-pill" style={{ marginRight: '10px' }}>
                View Order
              </button>
              <button onClick={handleLogoutClick} className="btn btn-dark px-4 rounded-pill custom-button-spacing">
                Logout
              </button>
            </div>
          </div>
        </nav>
  
        {/* Restaurant Details Section */}
        <Container className="mt-5">
          <Row className="text-center">
            <Col>
              <img src={image_url} alt={name} className="restaurant-image" />
            </Col>
          </Row>
  
          <Row className="text-center">
            <Col>
              <h2 className="restaurant-name">{name}</h2>
              <p className="restaurant-description">
                {description || 'No description available for this restaurant.'}
              </p>
              <p className="restaurant-location">
                {location || 'No location available.'}
              </p>
              <p className="restaurant-timings">
                {timings || 'No timings available.'}
              </p>
              <p className="restaurant-contact">
                {contact_info || 'No contact information available.'}
              </p>
            </Col>
            <Button onClick={handleEditProfileClick}>Edit profile</Button>
          </Row>
  
          {loading && <p className="text-center text-primary">Loading...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
  
          {/* Restaurant Menu Section */}
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
                            <strong>Price: </strong>${dish.price}
                          </Card.Text>
                          <div className="d-flex justify-content-between">
                            <Button onClick={() => handleEditDish(dish)} variant="primary" className="me-2">
                              Edit
                            </Button>
                            <Button onClick={() => handleDeleteDish(dish.id, restaurant.id)} variant="danger">
                              Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-center">No menu available for this restaurant.</p>
              )}
            </Col>
            <Button onClick={() => handleAddDish(restaurant_Id)} variant="primary" className="add-dish-btn">
              Add Dish
            </Button>
          </Row>
        </Container>
      </div>
    );
  };
  
  export default RestaurantDashboard;
  
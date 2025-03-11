import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestDishes } from '../../redux/actions/restaurantActions';
import { addFavorite } from '../../redux/actions/favoriteActions';
import { addToCart } from '../../redux/actions/cartActions';
import { Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import './RestaurantPage.css';
import { useNavigate } from 'react-router-dom';

const RestaurantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customer = useSelector((state) => state.customerLogin.customer);
  const customer_Id = customer.id;

  const restaurants = useSelector((state) => state.restaurantList.restaurants);
  const { loading, dishesByRestaurant, error } = useSelector(
    (state) => state.restDishesList
  );

  const restaurant = restaurants?.find((r) => r.id === parseInt(id));

  const dishes = dishesByRestaurant?.[restaurant?.id] || [];

  useEffect(() => {
    if (id) {
      dispatch(fetchRestDishes(id));
    }
  }, [id, dispatch]);

  if (!restaurant) {
    return <div>Restaurant not found!</div>;
  }

  // Extract restaurant details
  const { name, description, location, timings, image_url, contact_info } = restaurant;

  const handleFavoritesClick = async (e) => {
    navigate(`/customer/${customer_Id}/favorites`);
  };

  const restInput = {
    restaurant_Id: restaurant.id,
  }
  console.log("restInput: ", restInput);

  const handleAddToFavorites = async (e) => {
    dispatch(addFavorite(customer_Id, restInput)); 
    console.log(`Restaurant ${restaurant.name} added to favorites!`);
  };

  const handleAddToCart = async (customer_Id, restaurant_Id, dish_Id) => {
    const cartInput = {
      dish_Id: dish_Id,
      quantity: 1,
      restaurant_Id: restaurant_Id
    };
    dispatch(addToCart(customer_Id, cartInput));
  };

  const handleDashboardClick = async (e) => {
    navigate('/customer_dashboard');
  };

  const handleCartClick = async (e) => {
    navigate('/cart');
  };

  const handleProfileClick = async (e) => {
    e.preventDefault();
    navigate(`/customer/${customer_Id}`);
  };

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    navigate("/");
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
            <button onClick={handleCartClick} className="btn custom-btn">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  height: '25px',
                }}
                onClick={handleCartClick}
              >
                <img
                  src="/images/shopping_cart.png"
                  alt="Cart"
                  style={{
                    height: '100%',
                    width: 'auto',
                    transform: 'scale(1.5)',
                    transition: 'transform 0.3s',
                  }}
                />
              </div>
            </button>
            <button onClick={handleFavoritesClick} className="btn custom-btn">
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer', height: '25px'}}>
                <img src="/images/favorites.png" alt="favorites" style={{ height: '30px', width: 'auto', marginTop: 'px' }}/>
              </div>
            </button>
            <button onClick={handleDashboardClick} className="btn btn-outline-dark px-4 rounded-pill"
            style={{ marginRight: '10px' }}>
             Dashboard
            </button>
            <button onClick={handleProfileClick} className="btn btn-outline-dark px-4 rounded-pill">
              View Profile
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
              {contact_info || 'No contact info available.'}
            </p>
          </Col>
        </Row>

        {/* Add to Favorites Button */}
        <Row className="text-center mb-4">
          <Col>
            <Button
              variant="success"
              onClick={handleAddToFavorites}
              className="add-to-favorites-btn"
            >
              Add to Favorites
            </Button>
          </Col>
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
                      <Card.Img
                        variant="top"
                        src={dish.image_url || '/images/default-dish.jpg'}
                        className="dish-image"
                      />
                      <Card.Body>
                        <Card.Title>{dish.name}</Card.Title>
                        <Card.Text>{dish.description}</Card.Text>
                        <Card.Text>
                          <strong>Price: </strong>${dish.price}
                        </Card.Text>
                        <Button onClick={() => handleAddToCart(customer_Id, restaurant.id ,dish.id)} variant="primary" className="add-to-cart-btn">
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
    </div>
  );
};

export default RestaurantPage;

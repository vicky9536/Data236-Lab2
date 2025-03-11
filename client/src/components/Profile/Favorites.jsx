import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, removeFavorite } from '../../redux/actions/favoriteActions'; 
import { Button, Card, Col, Row, Container } from 'react-bootstrap';

const FavoriteRestaurantsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const favoritesState = useSelector((state) => state.favoriteList);
  const { loading, favorites, error } = favoritesState ? favoritesState : { loading: false, favorites: [], error: null };

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getFavorites(id));
  }, [dispatch, id, refresh]);

  const handleCardClick = async (restaurant_Id, e) => {
   
    if (!e.target.closest('.remove-btn')) { 
      navigate(`/restaurant/${restaurant_Id}`);
    }
  };

  const handleRemoveFavorite = async (favorite_Id) => {
    try {
      await dispatch(removeFavorite(id, favorite_Id)); 
      setRefresh(!refresh); 
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="favorite-restaurants-page">
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src="/images/ubereats_logo.png" alt="Uber Eats Logo" style={{ height: '20px' }} />
          </a>
          <div className="d-flex">
            <button onClick={() => navigate('/cart')} className="btn mx-2 px-4 rounded-pill">
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer', height: '25px' }}>
                <img src="/images/shopping_cart.png" alt="Cart" style={{ height: '100%', width: 'auto', transform: 'scale(1.5)', transition: 'transform 0.3s' }} />
              </div>
            </button>
            <button onClick={() => navigate('/customer_dashboard')} className="btn btn-outline-dark px-4 rounded-pill">
              Dashboard
            </button>
            <button onClick={() => navigate('/logout')} className="btn btn-dark px-4 rounded-pill custom-button-spacing">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <Container className="mt-4">
        <h2 className="text-center mb-4">Favorite Restaurants</h2>
        {loading && <p className="text-center text-primary">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <Row>
          {favorites && favorites.map((favorite) => (
            <Col md={4} key={favorite.id} className="mb-4">
              <Card onClick={(e) => handleCardClick(favorite.restaurant.id, e)} style={{ cursor: 'pointer' }}>
                <Card.Img
                  variant="top"
                  src={favorite.restaurant.image_url} 
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <Card.Body>
                  <Card.Title>{favorite.restaurant.name}</Card.Title>
                  <Card.Text>{favorite.restaurant.img_url}</Card.Text> 
                  
                  {/* Remove button with specific class to avoid redirect */}
                  <div className="d-flex justify-content-center align-items-center">
                    <Button 
                      variant="danger" 
                      onClick={() => handleRemoveFavorite(favorite.id)} 
                      className="remove-btn" // Add a class for the remove button
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FavoriteRestaurantsPage;

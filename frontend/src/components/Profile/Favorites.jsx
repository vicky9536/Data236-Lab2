import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites, removeFavorite } from '../../redux/actions/favoriteActions'; 
import { Button, Card, Col, Row, Container } from 'react-bootstrap';
import Layout from '../Layout/Layout';

const FavoriteRestaurantsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favoritesState = useSelector((state) => state.favoriteList);
  const { loading, favorites, error } = favoritesState ? favoritesState : { loading: false, favorites: [], error: null };

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch, refresh]);

  const handleCardClick = async (restaurantName, e) => {
    if (!e.target.closest('.remove-btn')) { 
      navigate(`/restaurant/${restaurantName}`);
    }
  };

  const handleRemoveFavorite = async (favorite_Id) => {
    try {
      await dispatch(removeFavorite(favorite_Id)); 
      setRefresh(!refresh); 
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <Layout variant="dashboard" isLoggedInDashboard={true}>
      <div className="favorite-restaurants-page">
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
                    
                    <div className="d-flex justify-content-center align-items-center">
                      <Button 
                        variant="danger" 
                        onClick={() => handleRemoveFavorite(favorite.id)} 
                        className="remove-btn"
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
    </Layout>
  );
};

export default FavoriteRestaurantsPage;

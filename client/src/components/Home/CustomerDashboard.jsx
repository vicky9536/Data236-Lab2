import React from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import useRestaurants from '../../hooks/useRestaurants';
import Layout from '../Layout/Layout';
import './Home.css';

const Dashboard = () => {
  const { loading, restaurants, error } = useRestaurants();
  const navigate = useNavigate();

  const handleCardClick = (restaurant_name) => {
    navigate(`/customer_dashboard/${encodeURIComponent(restaurant_name)}`);
  };

  return (
    <Layout isLoggedInDashboard={true} showButtons={false} variant="dashboard">
      <Container className="mt-4">
        <h2 className="text-center mb-4">Restaurants</h2>
        {loading && <p className="text-center text-primary">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <Row>
          {restaurants && restaurants.map((restaurant) => (
            <Col md={4} key={restaurant.id} className="mb-4">
              <Card onClick={() => handleCardClick(restaurant.name)} style={{ cursor: 'pointer' }}>
                <Card.Img
                  variant="top"
                  src={restaurant.image_url}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;

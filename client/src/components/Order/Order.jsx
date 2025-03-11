import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { getOrder } from '../../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restaurant_Id = useSelector((state) => state.restaurantLogin.restaurant.id);
  
  const {loading, orders, error} = useSelector((state) => state.orderGet) || {};
  useEffect(() => {
    if (restaurant_Id) {
      dispatch(getOrder(restaurant_Id)); // Fetch order items when the page loads
    }
  }, [dispatch, restaurant_Id]);
    console.log("OrderList-frontend: ",orders);

    const handleDashboardClick = async (e) => {
        navigate('/restaurant_dashboard');
    };

    const handleLogoutClick = async (e) => {
        navigate('/');
    };
  return (
    <div className = "order-container">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <img src="/images/ubereats_logo.png" alt="Uber Eats Logo" style={{ height: '20px' }} />
                </a>
                <div className="d-flex">    
                    <button onClick={handleDashboardClick} className="btn btn-outline-dark px-4 rounded-pill" style ={{ marginRight: '10px' }}>
                        Dashboard
                    </button>
                    <button onClick={handleLogoutClick} className="btn btn-dark px-4 rounded-pill">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
        {loading && <p className="text-center text-primary">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <Container className="mt-5 cart-container">
        <Row className="text-center">
          <Col>
            <h2>Orders</h2>
          </Col>
        </Row>
      </Container>

    {/* Order List */}
      <Row className="mt-4">
        {orders == null  ? (
          <Col>
            <Alert variant="info">No order placed</Alert>
          </Col>
        ) : (
          orders.map((order) => (
            <Col key={order.id} md={4} className="mb-4">
              <Card className="cart-item-card">
                <Card.Body className="text-center">
                  <Card.Title>Order #:{order.id}</Card.Title>
                  <Card.Text>status: {order.status}</Card.Text>
                    <Button variant="success" style = {{marginLeft: '-5px'}} className="btn-remove-item">
                        Edit Status
                    </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Order;

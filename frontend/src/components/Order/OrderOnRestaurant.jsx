import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Alert, Dropdown } from 'react-bootstrap';
import { getOrder } from '../../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';
import "./Order.css";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restaurant_Id = useSelector((state) => state.restaurantLogin.restaurant.id);
  const { loading, orders, error } = useSelector((state) => state.orderGet) || { orders: [] };
  const [statusFilter, setStatusFilter] = useState('All'); 

  useEffect(() => {
    if (restaurant_Id) {
      dispatch(getOrder(restaurant_Id)); 
    }
  }, [dispatch, restaurant_Id]);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status); 
  };

  
  const filteredOrders = Array.isArray(orders)
    ? statusFilter === 'All'
      ? orders
      : orders.filter((order) => order.status === statusFilter)
    : []; 

  const handleEditOrder = (order_Id) => {
    navigate(`/restaurant/order/edit_order/${order_Id}`);
  };
  const handleDashboardClick = async (e) => {
    e.preventDefault();
    navigate('/restaurant_dashboard');
  };

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="order-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src="/images/ubereats_logo.png" alt="Uber Eats Logo" style={{ height: '20px' }} />
          </a>
          <div className="d-flex">
            <button onClick={handleDashboardClick} className="btn btn-outline-dark px-4 rounded-pill" style={{ marginRight: '10px' }}>
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

      {/* Status Filter */}
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col md={4}>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
                {statusFilter === 'All' ? 'All Statuses' : statusFilter}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleStatusFilterChange('All')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilterChange('New')}>New</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilterChange('Delivered')}>Delivered</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilterChange('Cancelled')}>Cancelled</Dropdown.Item>
                {/* Add other statuses here */}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      {/* Order List */}
      <Row className="mt-4">
        {filteredOrders.length === 0 ? (
          <Col>
            <Alert variant="info">No orders found for the selected status</Alert>
          </Col>
        ) : (
          filteredOrders.map((order) => (
            <Col key={order.id} md={4} className="mb-4">
              <Card className="cart-item-card">
              <Card.Body className="text-center">
                <Card.Title className="card-order-title">Order #:{order.id}</Card.Title>
                <Card.Text className="card-order-text">Status: {order.status}</Card.Text>
                <Card.Text className="card-order-text">Price: ${order.price}</Card.Text>
                <Card.Text className="card-order-text">Customer ID: {order.customer_Id}</Card.Text>
                <Button 
                    variant="link" 
                    onClick={() => navigate(`/customer/profile/${order.customer_Id}`)} 
                    className="btn-view-profile">
                    View Customer Profile
                  </Button>
                <Button onClick = {() => handleEditOrder(order.id)}
                variant="success" style={{ marginLeft: '-5px' }} className="btn-remove-item">
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

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Alert, Dropdown } from 'react-bootstrap';
import { getAllRestaurantOrders } from '../../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './Order.css';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, orders, error } = useSelector((state) => state.getResOrder) || { orders: [] };
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    dispatch(getAllRestaurantOrders());
  }, [dispatch]);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const filteredOrders = Array.isArray(orders)
    ? statusFilter === 'All'
      ? orders
      : orders.filter((order) => order.regularStatus === statusFilter)
    : [];

  const handleEditOrder = (orderId) => {
    navigate(`/restaurant/order/edit_order/${orderId}`);
  };

  const handleViewProfile = (orderId) => {
    navigate(`/restaurant/order/view_cus_profile/${orderId}`);
  };

  return (
    <Layout variant="restaurant_dashboard" isLoggedInDashboard={true}>
      <div className="order-page">
        <Container className="mt-5">
          <Row className="text-center">
            <Col>
              <h2 className="order-page-title">Orders</h2>
            </Col>
          </Row>

          {/* Status Filter */}
          <Row className="justify-content-center mt-4">
            <Col md={4}>
              <div className="d-grid w-100">
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="w-100">
                    {statusFilter === 'All' ? 'All Statuses' : statusFilter}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusFilterChange('All')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusFilterChange('New')}>New</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusFilterChange('Delivered')}>Delivered</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusFilterChange('Cancelled')}>Cancelled</Dropdown.Item>
                    {/* Add more statuses if needed */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>

          {/* Loading/Error Messages */}
          <Row className="justify-content-center mt-4">
            <Col md={8} className="text-center">
              {loading && <p className="text-primary">Loading orders...</p>}
              {error && <Alert variant="danger">{error}</Alert>}
            </Col>
          </Row>

          {/* Order List */}
          <Row className="mt-4">
            {filteredOrders.length === 0 ? (
              <Col className="text-center">
                <Alert variant="info">No orders found for the selected status.</Alert>
              </Col>
            ) : (
              filteredOrders.map((order, index) => (
                <Col key={order._id} md={6} lg={4} className="mb-4">
                  <Card className="order-card shadow-sm">
                    <Card.Body className="text-center">
      
                      <Card.Title className="order-card-title">Order #{index + 1}</Card.Title>

                      <Card.Text className="order-card-text">
                        Status: {order.regularStatus || "Not specified"}
                      </Card.Text>
                      <Card.Text className="order-card-text">
                        Delivery Status: {order.deliveryStatus || "Not specified"}
                      </Card.Text>
                      <Card.Text className="order-card-text">
                        Price: ${order.price}
                      </Card.Text>

                      <Card.Text className="order-card-text">
                        Customer: {order.customerName || "Unknown"}
                      </Card.Text>

                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <Button
                          variant="outline-primary"
                          onClick={() => handleViewProfile(order._id)}
                          className="btn-view-profile"
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="outline-success"
                          onClick={() => handleEditOrder(order._id)}
                          className="btn-edit-order"
                        >
                          Edit Status
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Order;

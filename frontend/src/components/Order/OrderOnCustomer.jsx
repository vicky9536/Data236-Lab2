import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { getAllCustomerOrders } from '../../redux/actions/orderActions';
import Layout from '../Layout/Layout';

const OrderOnCustomer = () => {
  const dispatch = useDispatch();

  const { loading, orders, error } = useSelector((state) => state.getCusOrder) || { orders: [] };

  useEffect(() => {
    dispatch(getAllCustomerOrders());
  }, [dispatch]);

  return (
    <Layout variant="dashboard" isLoggedInDashboard={true}>
      <div className="order-history-page">
        <Container className="mt-5 order-history-container">
          <Row className="text-center">
            <Col>
              <h2>Your Order History</h2>
            </Col>
          </Row>

          {/* Loading or Error States */}
          {loading ? (
            <Row className="text-center mt-4">
              <Col>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </Col>
            </Row>
          ) : error ? (
            <Row className="text-center mt-4">
              <Col>
                <div className="alert alert-danger">
                  <strong>Error:</strong> {error}
                </div>
              </Col>
            </Row>
          ) : (
            // Order History List
            <Row className="mt-4">
              {orders.length === 0 ? (
                <Col className="text-center">
                  <div className="empty-message">
                    <p>Your order history is empty.</p>
                  </div>
                </Col>
              ) : (
                orders.map((order, index) => (
                  <Col key={order._id} md={4} className="mb-4">
                    <Card className="order-history-card">
                      <Card.Body>
                        <Card.Title>Order #{index + 1}</Card.Title>
                        <Card.Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Card.Text>
                        <Card.Text>Total Price: ${order.price.toFixed(2)}</Card.Text>

                        {/* View Order Details Button centered */}
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="primary"
                            onClick={() => {
                              // Optional: Navigate to detailed order page or open modal
                            }}
                            className="mt-2"
                          >
                            View Details
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default OrderOnCustomer;

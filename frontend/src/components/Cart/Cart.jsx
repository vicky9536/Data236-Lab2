import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { getCart, deleteCart, checkout } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [showToast, setShowToast] = useState(false);

  const cartList = useSelector((state) => state.cartList);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, refresh]);

  useEffect(() => {
    if (cartList && cartList.cartItems) {
      let total = 0;
      cartList.cartItems.forEach(item => {
        const price = parseFloat(item.dishId.price);
        const quantity = item.quantity;
        total += price * quantity;
      });
      setTotalPrice(total);
    }
  }, [cartList]);

  const handleFinalizeOrder = async () => {
    try {
      await dispatch(checkout());
      await dispatch(getCart()); // Ensure the cart is reloaded after checkout
      setToastMessage('Your order has been placed successfully!');
      setToastVariant('success');
      setShowToast(true);
      setRefresh(!refresh); // Trigger refresh for safety
    } catch (error) {
      console.error("Error checking out:", error);
      setToastMessage('There was an issue placing your order. Please try again.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await dispatch(deleteCart(cartId));
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <Layout variant="dashboard" isLoggedInDashboard={true}>
      <div className="cart-page">
        <Container className="mt-5 cart-container">
          <Row className="text-center">
            <Col>
              <h2>Your Cart</h2>
            </Col>
          </Row>
        </Container>

        {/* Cart Items or Empty Message */}
        <Row className="mt-4">
          {cartList?.cartItems?.length === 0 ? (
            <Col className="text-center">
              <div className="empty-message">
                <p>Your cart is empty.</p>
              </div>
            </Col>
          ) : (
            cartList?.cartItems?.map((item) => (
              <Col key={item.id} md={4} className="mb-4">
                <Card className="cart-item-card">
                  <Card.Body className="text-center">
                    <Card.Title>{item.dishId.name}</Card.Title>
                    <Card.Text>Price: ${item.dishId.price}</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(item._id)}
                      className="btn-remove-item"
                      style={{ marginLeft: '5px' }}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* Total Price */}
        {cartList?.cartItems?.length > 0 && (
          <Row className="mt-4">
            <Col className="text-center">
              <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            </Col>
          </Row>
        )}

        {/* Finalize Order Button */}
        {cartList?.cartItems?.length > 0 && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="success"
                onClick={handleFinalizeOrder}
                className="btn-finalize-order"
              >
                Place Order
              </Button>
            </Col>
          </Row>
        )}
      </div>

      {/* Toast Container for success/error messages */}
      <ToastContainer style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1050 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastVariant}>
          <Toast.Header>
            <strong className="me-auto">{toastVariant === 'success' ? 'Success' : 'Error'}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
};

export default Cart;

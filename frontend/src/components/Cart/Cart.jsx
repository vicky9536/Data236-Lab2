import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { getCart, deleteCart, checkout } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const cartList = useSelector((state) => state.cartList);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, refresh]);

  useEffect(() => {
    if (cartList && cartList.cartItems) {
      let totalPrice = 0;
      cartList.cartItems.forEach(item => {
        const price = parseFloat(item.Dish.price);
        const quantity = item.quantity;
        totalPrice += price * quantity;
      });
      setTotalPrice(totalPrice);
    }
  }, [cartList]);

  const handleFinalizeOrder = async () => {
    try {
      await dispatch(checkout());
      setOrderSuccess(true);
      navigate('/customer_dashboard');
    } catch (error) {
      console.error("Error checking out:", error);
      setOrderSuccess(false);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await dispatch(deleteCart(cartId));
      setRefresh(!refresh); // Trigger refresh to reload cart
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

        {orderSuccess !== null && (
          <Alert variant={orderSuccess ? 'success' : 'danger'} className="mt-4">
            {orderSuccess
              ? 'Your order has been placed successfully!'
              : 'There was an issue placing your order. Please try again.'}
          </Alert>
        )}

        {/* Cart Items */}
        <Row className="mt-4">
          {cartList == null || cartList.cartItems.length === 0 ? (
            <Col>
              <Alert variant="info">Your cart is empty.</Alert>
            </Col>
          ) : (
            cartList.cartItems.map((item) => (
              <Col key={item.id} md={4} className="mb-4">
                <Card className="cart-item-card">
                  <Card.Body className="text-center">
                    <Card.Title>{item.Dish.name}</Card.Title>
                    <Card.Text>Price: ${item.Dish.price}</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn-remove-item"
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
        {cartList && cartList.cartItems && cartList.cartItems.length > 0 && (
          <Row className="mt-4">
            <Col className="text-center">
              <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            </Col>
          </Row>
        )}

        {/* Finalize Order Button */}
        {cartList && cartList.cartItems && cartList.cartItems.length > 0 && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="success"
                onClick={handleFinalizeOrder}
                className="btn-finalize-order"
              >
                Order
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

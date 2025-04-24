import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { getCart, deleteCart, checkout } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customer = useSelector((state) => state.customerLogin.customer);
  const customer_Id = customer.id;
  const [refresh, setRefresh] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const cartList = useSelector((state) => state.cartList);

  useEffect(() => {
    if (customer_Id) {
      dispatch(getCart(customer_Id)); // Fetch cart items when the page loads
    }
  }, [dispatch, customer_Id, refresh]);

  useEffect(() => {
    if (cartList && cartList.cartItems) {
      let totalPrice = 0;
      cartList.cartItems.forEach(item => {
        const price = parseFloat(item.Dish.price); // Ensure price is a number
        const quantity = item.quantity;
        totalPrice += price * quantity;
      });
      setTotalPrice(totalPrice);
    }
  }, [cartList]);

  const handleFinalizeOrder = async (e) => {
    try{
      await dispatch(checkout(customer_Id)); // Checkout the cart
      setOrderSuccess(true);
      navigate('/customer_dashboard');
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  const handleRemoveItem = async(customer_Id, cartId) => {
    try{
      await dispatch(deleteCart(customer_Id, cartId)); // Remove item from cart
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleFavoritesClick = async (e) => {
    navigate(`/customer/${customer_Id}/favorites`);
  };

  const handleDashboardClick = async (e) => {
    navigate('/customer_dashboard');
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
    <Layout variant="dashboard" isLoggedInDashboard={true}>
      <div className="cart-page">
        <Container className="mt-5 cart-container">
          <Row className="text-center">
            <Col>
              <h2>{customer.name}'s Cart</h2>
            </Col>
          </Row>
        </Container>
        {orderSuccess !== null && (
            <Alert variant={orderSuccess ? 'success' : 'danger'} className="mt-4">
              {orderSuccess ? 'Your order has been placed successfully!' : 'There was an issue placing your order. Please try again.'}
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
                      variant="danger" style={{ marginLeft: '-5px' }}
                      onClick={() => handleRemoveItem(customer_Id, item.id)}
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
              className="btn-finalize-order">
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

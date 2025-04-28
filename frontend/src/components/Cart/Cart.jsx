import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Toast, ToastContainer, Spinner } from 'react-bootstrap';
import { getCart, deleteCart, checkout, updateCartItemQuantity } from '../../redux/actions/cartActions'; // Added updateCartItemQuantity
import { getDishDetails } from '../../redux/actions/dishActions';
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
  const [dishDetails, setDishDetails] = useState({});

  const cartList = useSelector((state) => state.cartList);
  const dishDetailsState = useSelector((state) => state.dishDetails);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, refresh]);

  // Fetch dish details whenever cartList changes
  useEffect(() => {
    const fetchDishDetails = async () => {
      if (cartList?.cartItems?.length > 0) {
        const newDishDetails = {};
        for (const item of cartList.cartItems) {
          if (!dishDetails[item.dishId]) {
            dispatch(getDishDetails(item.dishId));
          }
        }
      }
    };

    fetchDishDetails();
  }, [cartList, dispatch, dishDetails]);

  // Calculate total price based on cart items and fetched dish details
  useEffect(() => {
    if (cartList?.cartItems?.length > 0) {
      let total = 0;
      cartList.cartItems.forEach(item => {
        const dish = dishDetailsState.dishes[item.dishId];
        if (dish) {
          total += parseFloat(dish.price) * item.quantity;
        }
      });
      setTotalPrice(total);
    }
  }, [cartList, dishDetailsState]);

  const handleFinalizeOrder = async () => {
    console.log("cartList:", cartList);
    if (!cartList?.cartItems || cartList.cartItems.length === 0) {
      setToastMessage('Your cart is empty. Cannot place order.');
      setToastVariant('danger');
      setShowToast(true);
      return;
    }

    try {
      await dispatch(checkout(cartList.cartItems, cartList.cartItems[0].restaurantId, totalPrice));
      await dispatch(getCart());
      setToastMessage('Your order has been placed successfully!');
      setToastVariant('success');
      setShowToast(true);
      setRefresh(prev => !prev);
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

  const handleIncrementQuantity =  (dishId) => {
    const cartItem = cartList.cartItems.find(item => item.dishId === dishId);
    if (cartItem) {
      const newQuantity = cartItem.quantity + 1;
      dispatch(updateCartItemQuantity(cartItem._id, newQuantity));
      dispatch(getCart());
    }
  };

  const handleDecrementQuantity =  (dishId) => {
    const cartItem = cartList.cartItems.find(item => item.dishId === dishId);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;
      dispatch(updateCartItemQuantity(cartItem._id, newQuantity));
      dispatch(getCart());
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
            cartList?.cartItems?.map((item) => {
              const dish = dishDetailsState.dishes[item.dishId];

              return (
                <Col key={item._id} md={4} className="mb-4">
                  <Card className="cart-item-card">
                    <Card.Body className="text-center">
                      {dish ? (
                        <>
                          <Card.Title>{dish.name}</Card.Title>
                          <Card.Text>Price: ${dish.price.toFixed(2)}</Card.Text>
                          <Card.Text>Quantity: {item.quantity}</Card.Text>

                          {/* Quantity Buttons */}
                          <div className="quantity-buttons">
                            <Button
                              variant="outline-secondary"
                              onClick={() => handleDecrementQuantity(item.dishId)}
                              className="btn-quantity"
                            >
                              -
                            </Button>
                            <Button
                              variant="outline-secondary"
                              onClick={() => handleIncrementQuantity(item.dishId)}
                              className="btn-quantity"
                            >
                              +
                            </Button>
                          </div>

                          <Button
                            variant="danger"
                            onClick={() => handleRemoveItem(item._id)}
                            className="btn-remove-item"
                            style={{ marginLeft: '5px' }}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <Spinner animation="border" size="sm" />
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
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

      {/* Toast Container */}
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

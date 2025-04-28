import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestProfile } from '../../redux/actions/restProfileActions';
import { getOrderById, cancelOrder } from '../../redux/actions/orderActions';
import Layout from '../Layout/Layout';

const OrderDetailOnCustomer = () => {
    const { order_Id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, order, error } = useSelector((state) => state.getOrderById) || { order: null };
    const { restaurant } = useSelector((state) => state.getRestProfile) || { restaurant: null };

    const { loading: cancelLoading, canceledOrder, error: cancelError } = useSelector((state) => state.orderCancel) || {};

    const [toastVariant, setToastVariant] = useState('success');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (order_Id) {
            dispatch(getOrderById(order_Id));
        }
    }, [dispatch, order_Id]);

    useEffect(() => {
        if (order && order.restaurantId) {
            dispatch(getRestProfile(order.restaurantId));
        }
    }, [dispatch, order]);

    const handleBackToOrdersClick = () => {
        navigate('/customer_dashboard/orders');
    };

    const handleCancelOrderClick = () => {
        console.log("order delivery status:", order.deliveryStatus);
    
        if (order.deliveryStatus === 'Order Received') {
            dispatch(cancelOrder(order_Id)); // Dispatch the cancel order action
        } else {
            setToastMessage('Order cannot be cancelled at this stage.');
            setToastVariant('warning');
            setShowToast(true);
        }
    };

    useEffect(() => {
        if (cancelLoading) {
            setToastMessage('Cancelling order...');
            setToastVariant('info');
            setShowToast(true);
        } else if (canceledOrder) {
            setToastMessage('Order cancelled successfully!');
            setToastVariant('success');
            setShowToast(true);
            // Optionally refetch order details to show updated status
            dispatch(getOrderById(order_Id));
        } else if (cancelError) {
            setToastMessage('Failed to cancel order. Please try again.');
            setToastVariant('danger');
            setShowToast(true);
        }
    }, [cancelLoading, canceledOrder, cancelError, dispatch, order_Id]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    if (!order) {
        return <div className="text-center mt-5">No order data available</div>;
    }

    const toastContainerStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1050,
    };

    return (
        <Layout isLoggedInDashboard={true} showButtons={false} variant="dashboard">
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8} className="profile-container shadow-lg p-4 bg-light rounded">
                        <h2 className="text-center mb-4">Order Summary</h2>
                        <Card className="p-3">
                            <Card.Body>
                                <Card.Text>
                                    <strong>Order ID:</strong> {order._id}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Restaurant:</strong> {restaurant ? restaurant.name : 'Loading...'}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Total Price:</strong> ${order.price}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Order Status:</strong> {order.regularStatus}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Delivery Status:</strong> {order.deliveryStatus}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="secondary" onClick={handleBackToOrdersClick}>
                                Back to Orders
                            </Button>

                            {order.deliveryStatus === 'Order Received' && (
                                <Button variant="danger" onClick={handleCancelOrderClick}>
                                    Cancel Order
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Toast Message */}
            <ToastContainer style={toastContainerStyle}>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastVariant}>
                    <Toast.Header>
                        <strong className="me-auto">
                            {toastVariant === 'success' ? 'Success' : toastVariant === 'warning' ? 'Warning' : 'Error'}
                        </strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Layout>
    );
};

export default OrderDetailOnCustomer;

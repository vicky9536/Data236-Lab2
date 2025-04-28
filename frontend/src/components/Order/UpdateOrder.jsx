import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../redux/actions/orderActions';
import Layout from '../Layout/Layout';
import './Order.css';

const UpdateOrder = () => {
    const { order_Id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Access orders safely, making sure it's an array
    const { loading, orders = [], error } = useSelector((state) => state.getResOrder) || { orders: [] };
    const initialOrderData = orders.find(order => order._id === order_Id); 

    const [newDeliveryStatus, setNewDeliveryStatus] = useState({
        deliveryStatus: initialOrderData ? initialOrderData.deliveryStatus : '',
    });

    useEffect(() => {
        // If the order is not available, redirect to the orders page
        if (!initialOrderData) {
            navigate('/restaurant/order');
        }
    }, [initialOrderData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDeliveryStatus((prevDeliveryStatus) => ({
            ...prevDeliveryStatus,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateOrder(order_Id, newDeliveryStatus));
        navigate('/restaurant/order');
    };

    return (
        <Layout variant="restaurant_dashboard" isLoggedInDashboard={true}>
            <div className="update-order-container">
                {loading && <p className="text-center text-primary">Loading...</p>}
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                {/* Update Order Form */}
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={8} className="profile-container shadow-lg p-4 bg-white rounded">
                            <h2 className="text-center mb-4">Update Order Status</h2>
                            {initialOrderData ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formname" className="mb-3">
                                        <Form.Text className="match-label-style">
                                            Order #: {initialOrderData._id}
                                        </Form.Text> <br /><br />
                                        <Form.Text className="match-label-style">
                                            Price: ${initialOrderData.price}
                                        </Form.Text><br /><br />
                                        <Form.Text className="match-label-style">
                                            Current Status: {initialOrderData.regularStatus}
                                        </Form.Text><br /><br />
                                        <Form.Label>Delivery Status: </Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="deliveryStatus"
                                            value={newDeliveryStatus.deliveryStatus}
                                            onChange={handleChange}
                                            placeholder="Choose status"
                                            required
                                        >
                                            <option value="">Choose category</option>
                                            <option value="Order Received">Order Received</option>
                                            <option value="Preparing">Preparing</option>
                                            <option value="On the Way">On the Way</option>
                                            <option value="Pick-up Ready">Ready for Pickup</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Picked Up">Picked Up</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Button variant="success" type="submit" className="d-block mx-auto">
                                        Update Status
                                    </Button>
                                </Form>
                            ) : (
                                <Alert variant="warning" className="text-center">
                                    Order not found.
                                </Alert>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default UpdateOrder;

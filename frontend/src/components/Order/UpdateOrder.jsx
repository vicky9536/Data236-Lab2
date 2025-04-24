import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../redux/actions/orderActions';
import "./Order.css";

const UpdateOrder = () => {
    const order_Id = useParams().order_Id ;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, orders, error } = useSelector((state) => state.orderGet);
    const initalOrderData = orders[order_Id];

    const [newStatus, setNewStatus] = useState({
        status: '',
    });

    const handleDashboardClick = async (e) => {
        navigate('/restaurant_dashboard');
    };

    const handleLogoutClick = async (e) => {
        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStatus((prevStatus) => ({
        ...prevStatus,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateOrder(order_Id, newStatus));
        navigate('/restaurant/order');
    };

    return(
        <div className="update-order-container">
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
        {/* Update Order Form */}
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} className="profile-container shadow-lg p-4 bg-white rounded">
                    <h2 className="text-center mb-4">Update Order Status</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formname" className="mb-3">
                            <Form.Text className="match-label-style">
                                Order #: {initalOrderData.id}
                            </Form.Text> <br/><br/>
                            <Form.Text className="match-label-style">
                                Price: ${initalOrderData.price}
                            </Form.Text><br/><br/>
                            <Form.Text className="match-label-style">
                                Status: {initalOrderData.status}
                            </Form.Text><br/><br/>
                            <Form.Label>Delivery Status: </Form.Label>
                            <Form.Control
                                as="select"
                                name="name"
                                value={initalOrderData.status}
                                onChange={handleChange}
                                placeholder="Choose status"
                                required>

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
                </Col>
            </Row>
        </Container>
        </div>
    );
};
export default UpdateOrder;
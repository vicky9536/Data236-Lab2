import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../redux/actions/orderActions';
import { getCusProfileOrder } from '../../redux/actions/cusProfileActions';
import Layout from '../Layout/Layout';
import '../Profile/CustomerProfile.css';

const ViewCusProfile = () => {
    const { order_Id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, customer, error } = useSelector((state) => state.getCusProfileOrder) || { customer: null };
    const { loading: orderLoading, order, error: orderError } = useSelector((state) => state.getOrderById) || { order: null };

    useEffect(() => {
        if (order_Id) {
            dispatch(getOrderById(order_Id));
        }
    }, [dispatch, order_Id]);
    
    useEffect(() => {
        if (order && order.customerId) {
            dispatch(getCusProfileOrder(order.customerId)); 
        }
    }, [dispatch, order]);

    const handleBackToOrdersClick = () => {
        navigate('/restaurant/order'); 
    };

    if (loading || orderLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error || orderError) {
        return <div className="text-center text-danger mt-5">{error || orderError}</div>;
    }

    if (!customer) {
        return <div className="text-center mt-5">No customer data available</div>;
    }

    const profilePic = customer.img_url ? customer.img_url : 'https://via.placeholder.com/150';

    return (
        <Layout isLoggedInDashboard={true} showButtons={false} variant="dashboard">
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8} className="profile-container shadow-lg p-4 bg-light rounded">
                        <div className="text-center mb-4">
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="img-fluid rounded-circle profile-img"
                            />
                        </div>
                        <h2 className="text-center mb-4">{customer.name}'s Profile</h2>
                        <Card>
                            <Card.Body>
                                <p><strong>Name: </strong>{customer.name} {customer.lastName}</p>
                                <p><strong>Email: </strong>{customer.email}</p>
                                <p><strong>Description: </strong>{customer.description}</p>
                                <p><strong>Country: </strong>{customer.country}</p>
                                <p><strong>State: </strong>{customer.state}</p>
                                <Button variant="secondary" onClick={handleBackToOrdersClick} className="d-block mx-auto">
                                    Back to Orders
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default ViewCusProfile;

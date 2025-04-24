import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCusProfile } from '../../redux/actions/cusProfileActions';
import Layout from '../Layout/Layout';
import './CustomerProfile.css';

const CustomerProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, customer, error } = useSelector((state) => state.getCusProfile);

    useEffect(() => {
        dispatch(getCusProfile());
    }, [dispatch]);

    const handleEditProfile = () => {
        navigate(`/customer_dashboard/profile/update`);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    if (!customer) {
        return <div className="text-center">No customer data available</div>;
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
                                <Button variant="secondary" onClick={handleEditProfile} className="d-block mx-auto">
                                    Edit Profile
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default CustomerProfile;

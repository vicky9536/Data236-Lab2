import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCusProfile, updateCusProfile } from '../../redux/actions/cusProfileActions';
import Layout from '../Layout/Layout'; 

import './CustomerProfile.css';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const countries = ['Australia', 'Belgium', 'Canada', 'Chile', 'Costa Rica', 'Dominican Republic',
        'Ecuador', 'El Salvador', 'France', 'Germany', 'Guatemala', 'Ireland', 'Italy', 'Japan',
        'Kenya', 'Luxembourg', 'Mexico', 'Netherlands', 'New Zealand', 'Panama', 'Poland', 'Portugal',
        'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan(ROC)', 'United Kingdom', 'United States'
    ]; 

    const { loading, customer, error } = useSelector((state) => state.getCusProfile);

    useEffect(() => {
        dispatch(getCusProfile()); 
    }, [dispatch]);

    const [newData, setNewData] = useState({
        name: '',
        email: '',
        state: '',
        country: '',
        profilePic: 'https://via.placeholder.com/150',
        description: ''
    });

    useEffect(() => {
        if (customer) {
            setNewData({
                name: customer.name || '',
                email: customer.email || '',
                description: customer.description || '',
                country: customer.country || '',
                state: customer.state || '',
                profilePic: customer.profilePic || 'https://via.placeholder.com/150',
            });
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewData((prevProfile) => ({
                ...prevProfile,
                profilePic: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submission triggered", newData);
        await dispatch(updateCusProfile(newData));    
        navigate(`/customer_dashboard/profile`);
    };

    return (
        <Layout variant="profile" isLoggedInDashboard={true}> 
            {/* Profile Update Page Content */}
            <div className="update-profile">
                {loading && <p className="text-center text-primary">Loading...</p>}
                {error && <p className="text-center text-danger">{error}</p>}
                
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={8} className="profile-container shadow-lg p-4 bg-white rounded">
                            <h2 className="text-center mb-4">Update Profile</h2>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formname" className="mb-3">
                                    <Form.Label>Name: </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={newData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email: </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={newData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDescription" className="mb-3">
                                    <Form.Label>Description: </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={newData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Tell us something about yourself"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formCountry" className="mb-3">
                                    <Form.Label>Country: </Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="country"
                                        value={newData.country}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select a country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formState" className="mb-3">
                                    <Form.Label>State: </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={newData.state}
                                        onChange={handleChange}
                                        placeholder="Enter your state (e.g., CA)"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formProfilePic" className="mb-3">
                                    <Form.Label>Profile Picture: </Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                    />
                                    <div className="mt-3 text-center">
                                        <img
                                            src={newData.profilePic}
                                            alt="Profile"
                                            className="img-fluid rounded-circle"
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                    </div>
                                </Form.Group>

                                <Button variant="success" type="submit" className="d-block mx-auto">
                                    Update Profile
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
};

export default UpdateProfile;

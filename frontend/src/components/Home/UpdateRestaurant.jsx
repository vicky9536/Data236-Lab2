import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyRestProfile, updateRestProfile } from '../../redux/actions/restProfileActions';
import '../Profile/CustomerProfile.css';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, restaurant, error } = useSelector((state) => state.getMyRestProfile);

    // Fetch restaurant profile on component mount
    useEffect(() => {
        dispatch(getMyRestProfile()); // No need for id, it will be handled by the backend through session or token
    }, [dispatch]);

    const [newData, setNewData] = useState({
        name: '',
        location: '',
        description: '',
        contact_info: '',
        timings: '',
        profilePic: 'https://via.placeholder.com/150'
    });

    useEffect(() => {
        // Once restaurant data is fetched, set it into local state
        if (restaurant) {
            setNewData({
                name: restaurant.name || '',
                location: restaurant.location || '',
                description: restaurant.description || '',
                contact_info: restaurant.contact_info || '',
                timings: restaurant.timings || '',
                profilePic: restaurant.profilePic || 'https://via.placeholder.com/150',
            });
        }
    }, [restaurant]);

    // Handle changes to input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Handle profile picture change
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewData((prevProfile) => ({
                ...prevProfile,
                profilePic: URL.createObjectURL(file),
            }));
        }
    };

    // Handle profile update form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateRestProfile(restaurant._id, newData));
        dispatch(getMyRestProfile());
        navigate(`/restaurant_dashboard`);
    };

    return (
        <div className="update-profile">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <img src="/images/ubereats_logo.png" alt="Uber Eats Logo" style={{ height: '20px' }} />
                    </a>
                    <div className="d-flex">
                        <button onClick={() => navigate('/restaurant_dashboard')} className="btn btn-outline-dark px-4 rounded-pill" style={{ marginRight: '10px' }}>
                            Dashboard
                        </button>
                        <button onClick={() => navigate('/')} className="btn btn-dark px-4 rounded-pill">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Loading or Error States */}
            {loading && <p className="text-center text-primary">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {/* Profile Update Form */}
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8} className="profile-container shadow-lg p-4 bg-white rounded">
                        <h2 className="text-center mb-4">Update Profile</h2>
                        <Form onSubmit={handleSubmit}>
                            {/* Name */}
                            <Form.Group controlId="formname" className="mb-3">
                                <Form.Label>Name: </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={newData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your restaurant name"
                                    required
                                />
                            </Form.Group>

                            {/* Location */}
                            <Form.Group controlId="formLocation" className="mb-3">
                                <Form.Label>Location: </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    value={newData.location}
                                    onChange={handleChange}
                                    placeholder="Enter your restaurant location"
                                    required
                                />
                            </Form.Group>

                            {/* Description */}
                            <Form.Group controlId="formDescription" className="mb-3">
                                <Form.Label>Description: </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={newData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Tell us about your restaurant"
                                />
                            </Form.Group>

                            {/* Contact Info */}
                            <Form.Group controlId="formContactInfo" className="mb-3">
                                <Form.Label>Contact Information: </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="contact_info"
                                    value={newData.contact_info}
                                    onChange={handleChange}
                                    placeholder="Enter your contact information"
                                />
                            </Form.Group>

                            {/* Timings */}
                            <Form.Group controlId="formTimings" className="mb-3">
                                <Form.Label>Opening Hours: </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="timings"
                                    value={newData.timings}
                                    onChange={handleChange}
                                    placeholder="Enter your opening hours"
                                />
                            </Form.Group>

                            {/* Profile Picture */}
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

                            {/* Submit Button */}
                            <Button variant="success" type="submit" className="d-block mx-auto">
                                Update Profile
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateProfile;

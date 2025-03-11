import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestProfile, updateRestProfile } from '../../redux/actions/restProfileActions';


import '../Profile/CustomerProfile.css';

const UpdateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, restaurant, error } = useSelector((state) => state.getRestProfile);

    useEffect(() => {
        dispatch(getRestProfile(id));
    }, [dispatch, id]);
    

    const [newData, setNewData] = useState({
      name: '',
      location: '',
      description: '',
      contact_info: '',
      timings: '',
      profilePic: 'https://via.placeholder.com/150'
  });

    useEffect(() => {
      // Update state with the restaurant data once fetched
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
    }, [restaurant])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevProfile) => ({
        ...prevProfile,
        [name]: value,
        }));
    };

    // Handle profile picture change
    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewData((prevProfile) => ({
            ...prevProfile,
            profilePic: URL.createObjectURL(file),
        }));
        }
    };

    const handleDashboardClick = async (e) => {
        navigate('/restaurant_dashboard');
    };

    const handleLogoutClick = async (e) => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateRestProfile(id, newData));
        console.log('Profile updated successfully!');
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
    {/* Profile Container */}
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

                    <Form.Group controlId="formLocation" className="mb-3">
                        <Form.Label>Location: </Form.Label>
                        <Form.Control
                            type="location"
                            name="location"
                            value={newData.location}
                            onChange={handleChange}
                            placeholder="Enter your location"
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

                    <Form.Group controlId="formContactInfo" className="mb-3">
                        <Form.Label>Contact information: </Form.Label>
                        <Form.Control
                            as="textarea"
                            name="contact_info"
                            value={newData.contact_info}
                            onChange={handleChange}
                            placeholder="Enter your contact information"
                        />
                    </Form.Group>

                    <Form.Group controlId="formTimings" className="mb-3">
                        <Form.Label>Open Hour: </Form.Label>
                        <Form.Control
                            type="text"
                            name="timings"
                            value={newData.timings}
                            onChange={handleChange}
                            placeholder="Enter your open hour"
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
  );
};

export default UpdateProfile;

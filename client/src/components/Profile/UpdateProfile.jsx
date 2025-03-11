import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCusProfile, updateCusProfile } from '../../redux/actions/cusProfileActions';

import './CustomerProfile.css';

const UpdateProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const countries = ['Australia', 'Belgium', 'Canada', 'Chile', 'Costa Rica', 'Dominican Republic',
    'Ecuador', 'El Salvador', 'France', 'Germany', 'Guatemala', 'Ireland', 'Italy', 'Japan',
    'Kenya', 'Luxembourg', 'Mexico', 'Netherlands', 'New Zealand', 'Panama', 'Poland', 'Portugal',
    'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan(ROC)', 'United Kingdom', 'United States'
    ]; 

    const { loading, customer, error } = useSelector((state) => state.getCusProfile);
    console.log("selector customerData: ", customer);
    useEffect(() => {
        dispatch(getCusProfile(id));
    }, [dispatch, id]);
    
    console.log("customer: ", customer);

    const [newData, setNewData] = useState({
      name: '',
      email: '',
      state: '',
      country: '',
      profilePic: 'https://via.placeholder.com/150',
      description: ''
  });

    useEffect(() => {
      // Update state with the customer data once fetched
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

    const handleCartClick = async (e) => {
        navigate('/cart');
    };

    const handleDashboardClick = async (e) => {
        navigate('/customer_dashboard');
    };

    const handleFavoritesClick = async (e) => {
        navigate(`/customer/${id}/favorites`);
    };

    const handleLogoutClick = async (e) => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('New Data:', newData);
        dispatch(updateCusProfile(id, newData));
        console.log('Profile updated successfully!');
        navigate(`/customer/${id}`);
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
                <button onClick={handleCartClick} className="btn mx-2 px-4 rounded-pill">
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer', height: '25px'}}>
                        <img src="/images/shopping_cart.png" alt="Cart"
                            style={{ height: '100%', width: 'auto', transform: 'scale(1.5)',transition: 'transform 0.3s',}}/>
                    </div>
                </button>
                <button onClick={handleFavoritesClick} className="btn custom-btn">
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer', height: '25px'}}>
                    <img src="/images/favorites.png" alt="favorites" style={{ height: '30px', width: 'auto', marginTop: 'px' }}/>
                </div>
                </button>
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
  );
};

export default UpdateProfile;

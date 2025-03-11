import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Container, Button, Badge, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useRestaurants from '../../hooks/useRestaurants';
import './Home.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const customer = useSelector((state) => state.customerLogin.customer);
    const customer_Id = customer.id;
    const { loading, restaurants, error } = useRestaurants();

    /*
    const handleCardClick = (id) => {
        navigate(`/restaurant/${id}`);
    };
    */

    const handleCardClick = async(id) => {
        navigate(`/restaurant/${id}`);
    };

    const handleFavoritesClick = async(e) => {
        navigate(`/customer/${customer_Id}/favorites`);
    };
    const handleCartClick = async(e) => {
        navigate('/cart');
    };

    const handleProfileClick = async (e) => { 
        navigate(`/customer/${customer_Id}`);
    }

    const handleLogoutClick = async (e) => {
        e.preventDefault();
        navigate("/logout");
    }

    return (
        <div className="dashboard">
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
            <div className="container-fluid">
            <a className="navbar-brand">
                <img
                src="/images/ubereats_logo.png"
                alt="Uber Eats Logo"
                style={{ height: '20px' }}
                />
            </a>
            <div className="d-flex">
            <button onClick={handleCartClick} className="btn custom-btn">
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative',
                    cursor: 'pointer', height: '25px'}}>
                    <img src="/images/shopping_cart.png" alt="Cart"
                    style={{  height: '100%', width: 'auto', transform: 'scale(1.5)', transition: 'transform 0.3s'}}/>
                </div>
                </button>
                <button onClick={handleFavoritesClick} className="btn custom-btn">
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer', height: '25px'}}>
                    <img src="/images/favorites.png" alt="favorites" style={{ height: '30px', width: 'auto', marginTop: 'px' }}/>
                </div>
                </button>
                <button onClick={handleProfileClick} className="btn btn-outline-dark px-4 rounded-pill">
                View Profile
                </button>
                <button onClick={handleLogoutClick} className="btn btn-dark px-4 rounded-pill custom-button-spacing">
                Logout
                </button>
            </div>
            </div>
        </nav>
        <Container className="mt-4">
            <h2 className="text-center mb-4">Restaurants</h2>
            {loading && <p className="text-center text-primary">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}
            <Row>
                {restaurants && restaurants.map((restaurant) => (
                <Col md={4} key={restaurant.id} className="mb-4">
                  
                    <Card   onClick={(e) => handleCardClick(restaurant.id)} style={{ cursor: 'pointer' }}>
                    <Card.Img
                        variant="top"
                        src={restaurant.image_url}
                        style={{ height: '200px', objectFit: 'contain' }}
                    />
                    <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>
        </div>
    );
};

            
                
export default Dashboard;

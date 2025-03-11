import React, {useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCusProfile } from '../../redux/actions/cusProfileActions';
import './CustomerProfile.css'; // import your custom styles

const CustomerProfile = () => {
    /* Dummy data for customer profile
    const customer = {
        firstName: 'Jiyoon',
        lastName: 'Lee',
        description: 'Something about me',
        email: 'jiyoonlee.0716@gmail.com',
        country: 'USA',
        state: 'CA',
        profilePic: 'https://via.placeholder.com/150'
    };
    */
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, customer, error } = useSelector((state) => state.getCusProfile);

    useEffect(() => {
        dispatch(getCusProfile(id));
    }, [dispatch, id]);
    console.log("customer: ", customer);

    const handleCartClick = async (e) => {
        navigate('/cart');
    };

    const handleDashboardClick = async (e) => {
        navigate('/customer_dashboard');
    };

    const handleLogoutClick = async (e) => {
        navigate('/logout');
    };

    const handleEditProfile = async(e) => {
        navigate(`/customer/${id}/update`);
    };

    const handleFavoritesClick = async(e) => {
        navigate(`/customer/${id}/favorites`);
    };

    if (!customer) {
        return <div>No customer data available</div>;
    }

    const profilePic = customer.img_url ? customer.img_url : 'https://via.placeholder.com/150';

    return (
        <div className="customer-profile">
        {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
                <div className="container-fluid">
                {loading && <p className="text-center text-primary">Loading...</p>}
                {error && <p className="text-center text-danger">{error}</p>}
                    <a className="navbar-brand">
                        <img src="/images/ubereats_logo.png" alt="Uber Eats Logo" style={{ height: '20px' }}/>
                    </a>
                    <div className="d-flex">
                        <button onClick={handleCartClick} className="btn mx-2 px-4 rounded-pill">
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative',
                            cursor: 'pointer', height: '25px'}}>
                                <img src="/images/shopping_cart.png" alt="Cart" style={{ height: '100%', width: 'auto',
                                transform: 'scale(1.5)', transition: 'transform 0.3s', }}/>
                        </div>
                        </button>
                        <button onClick={handleFavoritesClick} className="btn custom-btn">
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer', height: '25px'}}>
                            <img src="/images/favorites.png" alt="favorites" style={{ height: '30px', width: 'auto', marginTop: 'px' }}/>
                        </div>
                        </button>
                        <button onClick={handleDashboardClick} className="btn btn-outline-dark px-4 rounded-pill">
                            Dashboard
                        </button>
                        <button onClick={handleLogoutClick} className="btn btn-dark px-4 rounded-pill custom-button-spacing">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        {/* Profile Container */}
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
                <p><strong>Name: </strong>{customer.name} {customer.lastName}</p>
                <p><strong>Email: </strong>{customer.email}</p>
                <p><strong>Description: </strong>{customer.description}</p>
                <p><strong>Country: </strong>{customer.country}</p>
                <p><strong>State: </strong>{customer.state}</p>
                <Button variant="secondary" onClick={handleEditProfile} className="d-block mx-auto">Edit Profile</Button>
            </Col>
            </Row>
        </Container>
    </div>
  );
};

export default CustomerProfile;

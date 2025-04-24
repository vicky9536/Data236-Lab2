import React, {useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCusProfile } from '../../redux/actions/cusProfileActions';
import '../Profile/CustomerProfile.css'; 

const ViewCusProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, customer, error } = useSelector((state) => state.getCusProfile);

    useEffect(() => {
        dispatch(getCusProfile(id));
    }, [dispatch, id]);
    console.log("customer: ", customer);

    const handleDashboardClick = async (e) => {
        e.preventDefault();
        navigate('/restaurant_dashboard');
    };
    
    const handleLogoutClick = async (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleBackToOrdersClick = async (e) => {
        e.preventDefault();
        navigate('/restaurant/order'); 
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
                <a className="navbar-brand">
                    <img src="/images/ubereats_logo.png" alt="Uber Eats Logo" style={{ height: '20px' }} />
                </a>
                <div className="d-flex">
                    <button onClick={handleDashboardClick} className="btn btn-outline-dark px-4 rounded-pill" style={{ marginRight: '10px' }}>
                    Dashboard
                    </button>
                    <button onClick={handleLogoutClick} className="btn btn-dark px-4 rounded-pill">
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
                <div className="text-center mt-4">
                    <Button onClick={handleBackToOrdersClick} className="btn btn-primary px-4 ">
                        Back to Orders
                    </Button>
                </div>
            </Col>
            </Row>
        </Container>
    </div>
  );
};

export default ViewCusProfile;

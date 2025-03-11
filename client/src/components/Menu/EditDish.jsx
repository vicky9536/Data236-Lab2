import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDish, getOneDish } from '../../redux/actions/dishActions';

const EditDish = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const id = useParams().dish_Id;
    const restaurant_Id = useSelector((state) => state.restaurantLogin.restaurant.id);

    const { loading, dish, error } = useSelector((state) => state.dishGet); 
    useEffect(() => {
        dispatch(getOneDish(id, restaurant_Id));
    }, [dispatch, id, restaurant_Id]); 

    console.log("initialData", dish);

    const [newData, setNewData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });

    useEffect(() => {
        if (dish) {
            setNewData({
                name: dish.name || '',
                description: dish.description || '',
                price: dish.price || '',
                category: dish.category || '',
            });
        }
    }, [dish]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevDish) => ({
        ...prevDish,
        [name]: value,
        }));
    };

    const handleDashboardClick = async (e) => {
        navigate('/restaurant_dashboard');
    };

    const handleLogoutClick = async (e) => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(updateDish(id, restaurant_Id , newData));
        navigate('/restaurant_dashboard');
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
                    <h2 className="text-center mb-4">Edit Dish</h2>
    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formname" className="mb-3">
                            <Form.Label>Name: </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newData.name}
                                onChange={handleChange}
                                placeholder="Enter dish name"
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
                                placeholder="Enter description"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrice" className="mb-3">
                            <Form.Label>Price: </Form.Label>
                            <Form.Control
                                type="decimal(10,2)"
                                name="price"
                                value={newData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                            />
                        </Form.Group>

                        <Form.Group controlId="formLocation" className="mb-3">
                            <Form.Label>Category: </Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={newData.category}
                                onChange={handleChange}
                                placeholder="Choose category"
                                required
                            >
                                <option value="">Choose category</option>
                                <option value="Appetizer">Appetizer</option>
                                <option value="Salad">Salad</option>
                                <option value="Main Course">Main Course</option>
                            </Form.Control>
                        </Form.Group>
    
    
                        <Button variant="success" type="submit" className="d-block mx-auto">
                            Edit Dish
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
    );

};

export default EditDish;

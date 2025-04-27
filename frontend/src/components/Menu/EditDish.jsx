import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDish, getOneDish } from '../../redux/actions/dishActions';
import Layout from '../Layout/Layout';

const EditDish = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const restaurant_Id = useSelector((state) => state.restaurantLogin.restaurant._id);
    const { loading, dish, error } = useSelector((state) => state.getOneDish) || { dish: {} };

    useEffect(() => {
        dispatch(getOneDish(dish._id, restaurant_Id));
    }, [dispatch, dish._id, restaurant_Id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateDish(dish._id, restaurant_Id, newData));
        navigate('/restaurant_dashboard');
    };

    return (
        <Layout variant="restaurant_dashboard" isLoggedInDashboard={true}>
            <div className="update-profile">
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={8} className="profile-container shadow-lg p-4 bg-white rounded">
                            <h2 className="text-center mb-4">Edit Dish</h2>
    
                            {loading && <p className="text-center text-primary">Loading...</p>}
                            {error && <p className="text-center text-danger">{error}</p>}
    
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
        </Layout>
    );
};

export default EditDish;

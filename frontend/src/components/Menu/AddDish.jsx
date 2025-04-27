    import React, { useState } from 'react';
    import { Container, Row, Col, Button, Form } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import { createDish } from '../../redux/actions/dishActions';
    import Layout from '../Layout/Layout';

    const AddDish = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
    
        const [newData, setNewData] = useState({
            name: '',
            description: '',
            price: '',
            category: '',
        });

        const { loading, dishes, error } = useSelector((state) => state.dishAdd);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setNewData((prevDish) => ({
                ...prevDish,
                [name]: value,
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            dispatch(createDish(newData)); 
            navigate('/restaurant_dashboard');
        };

        return (
            <Layout variant="restaurant_dashboard" isLoggedInDashboard={true}>
                <div className="update-profile">
                    <Container className="mt-5">
                        <Row className="justify-content-center">
                            <Col md={8} className="profile-container shadow-lg p-4 bg-white rounded">
                                <h2 className="text-center mb-4">Add Dish</h2>

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

                                    <Form.Group controlId="formCategory" className="mb-3">
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
                                        Add Dish
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Layout>
        );
    };

    export default AddDish;

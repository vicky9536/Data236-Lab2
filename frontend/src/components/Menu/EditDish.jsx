import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDish, getOneDish } from '../../redux/actions/dishActions';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Layout from '../Layout/Layout';

const EditDish = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dishId } = useParams(); 

  console.log("dishId:", dishId);
  
  // Fetch the dish data from the Redux store
  const { loading, dish, error } = useSelector((state) => state.dishGet) || { dish: {} };

  const [newData, setNewData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    dispatch(getOneDish(dishId));
  }, [dispatch, dishId]);


  console.log("dish:", dish);
  
  useEffect(() => {
    if (dish && dish._id) {
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
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dish && dish._id) {
      dispatch(updateDish(dish._id, newData)); // Update the dish based on its ID
      navigate('/restaurant_dashboard'); // Redirect to the dashboard after successful update
    } else {
      console.error("Dish ID is not available yet!");
    }
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
                <Form.Group controlId="formName" className="mb-3">
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
                    type="number"
                    step="0.01"
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

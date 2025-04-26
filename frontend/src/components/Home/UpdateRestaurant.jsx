import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getMyRestProfile, updateRestProfile } from '../../redux/actions/restProfileActions';
import Layout from '../Layout/Layout';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { restaurant, loading, error } = useSelector((state) => state.getMyRestProfile);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    description: '',
    location: '',
    timings: '',
    contact_info: '',
  });

  useEffect(() => {
    if (restaurant) {
      setUpdatedData({
        name: restaurant.name || '',
        description: restaurant.description || '',
        location: restaurant.location || '',
        timings: restaurant.timings || '',
        contact_info: restaurant.contact_info || '',
      });
    }
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurant?.id) {
      console.error("Restaurant not found.");
      return;
    }
    dispatch(updateRestProfile(restaurant.id, updatedData));
    dispatch(getMyRestProfile());
    navigate('/restaurant_dashboard');
  };

  return (
    <Layout variant="restaurant_dashboard" isLoggedInDashboard={true}>
      <div className="update-profile">
        <Container className="mt-5">
          <Row className="justify-content-center" >
            <Col md={8} className="profile-container shadow-lg p-4 bg-white rounded">
              <h2 className="text-center mb-4">Update Profile</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={updatedData.name}
                    onChange={handleChange}
                    placeholder="Enter restaurant name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Description: </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={updatedData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter description"
                  />
                </Form.Group>

                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Location: </Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={updatedData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                  />
                </Form.Group>

                <Form.Group controlId="formTimings" className="mb-3">
                  <Form.Label>Timings: </Form.Label>
                  <Form.Control
                    type="text"
                    name="timings"
                    value={updatedData.timings}
                    onChange={handleChange}
                    placeholder="Enter restaurant timings"
                  />
                </Form.Group>

                <Form.Group controlId="formContactInfo" className="mb-3">
                  <Form.Label>Contact Info: </Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_info"
                    value={updatedData.contact_info}
                    onChange={handleChange}
                    placeholder="Enter contact info"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="d-block mx-auto">
                  Update Profile
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default UpdateProfile;

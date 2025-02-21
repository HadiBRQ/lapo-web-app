import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner, Alert } from "reactstrap";
import createSubscriptionPlan from "common/realBackend/subscription/createSubscriptionPlan";

const subscriptionPeriods = ['days', 'monthly', 'yearly', 'lifetime'];

const CreatePlanModal = ({ show, onCloseClick, onSave }) => {
  const [planData, setPlanData] = useState({
    name: '',
    description: '',
    price: '', // Amount renamed to price
    subscriptionPeriod: 'monthly', // Default to 'monthly'
    features: '' // Initialize as an empty string
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' }); // Alert state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const getPeriodDuration = (subscriptionPeriod) => {
    switch (subscriptionPeriod) {
      case 'days':
        return '30'; // Assuming monthly duration as 30 days
      case 'monthly':
        return '30'; // Default to 30 days for monthly
      case 'yearly':
        return '365'; // Default to 365 days for yearly
      case 'lifetime':
        return '0'; // Lifetime could be represented as 0 or some other value
      default:
        return '30'; // Default to 30 days if not recognized
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const payload = { 
      ...planData,
      periodDuration: getPeriodDuration(planData.subscriptionPeriod), // Set periodDuration based on subscriptionPeriod
      features: planData.features.split(',').map(f => f.trim()) // Ensure `features` is a string before calling `.split()`
    };

    try {
      await createSubscriptionPlan(payload);
      setAlert({ type: 'success', message: 'Subscription plan created successfully!' });
      onSave();
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to create subscription plan.' });
      console.error('Error creating subscription plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={show} toggle={onCloseClick}>
      <ModalHeader toggle={onCloseClick}>Create New Plan</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Plan Name</Label>
            <Input type="text" name="name" id="name" value={planData.name} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="description" value={planData.description} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input type="text" name="price" id="price" value={planData.price} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="subscriptionPeriod">Subscription Period</Label>
            <Input type="select" name="subscriptionPeriod" id="subscriptionPeriod" value={planData.subscriptionPeriod} onChange={handleInputChange}>
              {subscriptionPeriods.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="features">Features (Comma Separated)</Label>
            <Input type="text" name="features" id="features" value={planData.features} onChange={handleInputChange} />
          </FormGroup>
        </Form>
        {alert.message && (
          <Alert color={alert.type} className="mt-3">
            {alert.message}
          </Alert>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave} disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Save'}
        </Button>{' '}
        <Button color="secondary" onClick={onCloseClick} disabled={loading}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreatePlanModal;

import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";

const EditPlanModal = ({ show, onCloseClick, plan, onSave }) => {
  const [planData, setPlanData] = useState(plan || {});
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    setPlanData(plan || {});
  }, [plan]);

  const handleInputChange = (e) => {
    setPlanData({ ...planData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true); // Set loading to true
    try {
      await onSave(planData); // Await the onSave function which should be an async function
    } catch (error) {
      console.error('Error saving plan:', error);
    } finally {
      setLoading(false); // Set loading to false after saving
    }
  };

  return (
    <Modal isOpen={show} toggle={onCloseClick}>
      <ModalHeader toggle={onCloseClick}>Edit Plan</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Plan Name</Label>
            <Input type="text" name="name" id="name" value={planData.name || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="description" value={planData.description || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input type="number" name="price" id="price" value={planData.price || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="subscriptionPeriod">Subscription Period</Label>
            <Input type="text" name="subscriptionPeriod" id="subscriptionPeriod" value={planData.subscriptionPeriod || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="periodDuration">Period Duration</Label>
            <Input type="number" name="periodDuration" id="periodDuration" value={planData.periodDuration || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="features">Features</Label>
            <Input type="textarea" name="features" id="features" value={planData.features?.join(", ") || ''} onChange={handleInputChange} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave} disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Save'}
        </Button>{' '}
        <Button color="secondary" onClick={onCloseClick}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditPlanModal;

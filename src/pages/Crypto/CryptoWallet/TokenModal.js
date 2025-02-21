import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Alert } from "reactstrap";

const TokenModal = ({ isOpen, toggle }) => {
  const [token, setToken] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    // Simulate token submission
    console.log("Token submitted:", token);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      toggle();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Enter Token</ModalHeader>
      <ModalBody>
        {success && <Alert color="success">Token has been successfully verified!</Alert>}
        <form onSubmit={handleTokenSubmit}>
          <FormGroup>
            <Label for="token">Token</Label>
            <Input
              type="text"
              name="token"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">Submit Token</Button>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default TokenModal;

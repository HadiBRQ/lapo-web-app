// src/components/Common/ConfirmDeleteModal.js
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmDeleteModal = ({ show, onDeleteClick, onCloseClick, planName }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick}>
      <ModalHeader toggle={onCloseClick}>Confirm Deletion</ModalHeader>
      <ModalBody>
        Are you sure you want to permanently delete the subscription plan "{planName}"?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onDeleteClick}>
          Delete
        </Button>
        <Button color="secondary" onClick={onCloseClick}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDeleteModal;

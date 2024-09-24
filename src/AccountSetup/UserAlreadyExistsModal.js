import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./GoogleSignUp.css";

const UserAlreadyExistsModal = ({ isOpen, onCancel, email }) => {
  return (
    <Modal show={isOpen} onHide={onCancel} centered backdrop="static" keyboard={false}>
      <Modal.Header >
        <Modal.Title>User Already Exists</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          The email <strong>{email}</strong> is already registered. Please use
          another email or login.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserAlreadyExistsModal;

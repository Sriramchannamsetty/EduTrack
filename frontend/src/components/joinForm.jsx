import React, { useState,useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthUser } from "../../store/Auth-store";
import { useNavigate } from "react-router";
const JoinForm = ({ show, handleClose ,courseid}) => {
  const [passkey, setPasskey] = useState("");
   const {user,getMe}=useContext(AuthUser);
   const userid=user._id;
   const navigate=useNavigate();
   const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`http://localhost:5000/api/${userid}/course/${courseid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passkey }), // Convert object to JSON string
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
  
      const data = await res.json();

      await getMe();
  
      navigate("/specific", { state: { userId: userid, courseId: courseid } });
  
    } catch (err) {
      console.error("Failed to join course:", err);
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Join Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="passkey">
            <Form.Label>Enter Passkey</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course passkey"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Join
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default JoinForm;

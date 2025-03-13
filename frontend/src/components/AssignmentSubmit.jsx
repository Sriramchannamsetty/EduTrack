import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const AssignmentSubmit = () => {
  const location = useLocation();
  const assignment = location.state?.doc; // Get assignment details

  const userId = location.state?.userId; // Get userId
  const courseId = location.state?.courseId; // Get courseId

  const [solution, setSolution] = useState("");
  const [message, setMessage] = useState("");

  if (!assignment) {
    return <Alert variant="danger">Assignment details not found.</Alert>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!solution.trim()) {
      setMessage("Solution cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/${userId}/course/${courseId}/assignment/${assignment._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          solution: solution,
        }),
      });

      if (!response.ok) throw new Error("Submission failed.");
      const data = await response.json();
      setMessage("Assignment submitted successfully!");
      console.log("Submission response:", data);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setMessage("Failed to submit assignment.");
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{assignment.title}</Card.Title>
          <Card.Text>{assignment.description}</Card.Text>
          <Card.Text>
            <strong>Course:</strong> {assignment.course}
          </Card.Text>
          <Card.Text>
            <strong>Points:</strong> {assignment.points}
          </Card.Text>
          <Card.Text>
            <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleString()}
          </Card.Text>
          <Card.Text>
            <strong>Question:</strong> {assignment.question}
          </Card.Text>
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="solution">
          <Form.Label>Your Solution</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Write your solution here..."
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit Assignment
        </Button>
      </Form>

      {message && <Alert className="mt-3">{message}</Alert>}
    </Container>
  );
};

export default AssignmentSubmit;

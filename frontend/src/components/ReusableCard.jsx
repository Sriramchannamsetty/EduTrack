import React from "react";
import { Card } from "react-bootstrap";
import { FaBook, FaTasks } from "react-icons/fa";

const ReusableCard = ({ doc, role, isEnrolled, type, onClick }) => {
  console.log(doc);
  const getIcon = () => {
    switch (type) {
      case "course":
        return <FaBook className="text-primary" size={30} />;
      case "assignment":
        return <FaTasks className="text-success" size={30} />;
      default:
        return <FaBook size={30} />;
    }
  };

  const getButtonText = () => {
    if (type === "assignment") {
      return "View Assignment";
    }
    if (role === "teacher") {
      return type === "course" ? "View Course" : "View Assignment";
    }
    if (role === "student") {
      if (isEnrolled) {
        return `View ${type === "course" ? "Course" : "Assignment"}`;
      } else {
        return "Join Course";
      }
    }
    return "View Details";
  };

  const renderAdditionalDetails = () => {
    const additionalDetails = [];
    if (type === "course" && doc.points) {
      additionalDetails.push(
        <Card.Text key="points" className="text-muted">
          <strong>Points:</strong> {doc.points}
        </Card.Text>
      );
    }
    if (type === "assignment" && doc.dueDate) {
      additionalDetails.push(
        <Card.Text key="dueDate" className="text-muted">
          <strong>Due Date:</strong> {doc.dueDate}
        </Card.Text>
      );
    }
    return additionalDetails;
  };

  return (
    <Card className="mb-4 shadow-sm rounded">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="me-3">{getIcon()}</div>
          <div>
            <Card.Title className="mb-1">{doc.title}</Card.Title>
            <Card.Text className="text-muted">{doc.description}</Card.Text>
            {renderAdditionalDetails()}
          </div>
        </div>
        <button className="btn btn-outline-primary mt-3" onClick={onClick}>
          {getButtonText()}
        </button>
      </Card.Body>
    </Card>
  );
};

export default ReusableCard;

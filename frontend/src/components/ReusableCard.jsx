import React from "react";
import { Card } from "react-bootstrap";
import { FaBook, FaTasks } from "react-icons/fa";

const ReusableCard = ({ title, description, type, onClick }) => {
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

  return (
    <Card className="mb-4 shadow-sm" style={{ borderRadius: "15px" }}>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="me-3">{getIcon()}</div>
          <div>
            <Card.Title className="mb-1">{title}</Card.Title>
            <Card.Text className="text-muted">{description}</Card.Text>
          </div>
        </div>
        <button className="btn btn-outline-primary mt-3" onClick={onClick}>
          View Details
        </button>
      </Card.Body>
    </Card>
  );
};

export default ReusableCard;

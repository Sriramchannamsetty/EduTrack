import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { FaBook, FaTasks } from "react-icons/fa";
import JoinForm from "./JoinForm"; // Import JoinForm

const ReusableCard = ({ doc, role, isEnrolled, type, onClick }) => {
  const [showJoinForm, setShowJoinForm] = useState(false);



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
    if (type === "assignment") return "View Assignment";
    if (role === "teacher") return type === "course" ? "View Course" : "View Assignment";
    if (role === "student") {
      return isEnrolled ? `View ${type === "course" ? "Course" : "Assignment"}` : "Join Course";
    }
    return "View Details";
  };

  const renderAdditionalDetails = () => {
    return (
      <>
        {type === "course" && doc.points && (
          <Card.Text className="text-muted">
            <strong>Points:</strong> {doc.points}
          </Card.Text>
        )}
        {type === "assignment" && doc.dueDate && (
          <Card.Text className="text-muted">
            <strong>Due Date:</strong> {doc.dueDate}
          </Card.Text>
        )}
      </>
    );
  };

  const buttonText = getButtonText(); // Get button text dynamically

  return (
    <>
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
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => {
              if (buttonText === "Join Course") {
                setShowJoinForm((prev)=>{return !prev}); // Open JoinForm modal
              } else {
                onClick(); // Trigger default click action
              }
            }}
          >
            {buttonText}
          </button>
        </Card.Body>
      </Card>

      {/* JoinForm Modal */}
      <JoinForm show={showJoinForm} courseid={doc._id} handleClose={() => setShowJoinForm(false)} />
    </>
  );
};

export default ReusableCard;

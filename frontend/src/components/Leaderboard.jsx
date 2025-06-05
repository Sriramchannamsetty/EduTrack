import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import placeholderImage from "../assets/profile.jpg"; // Importing the placeholder
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leaderboard");
        if (!response.ok) throw new Error("Failed to fetch leaderboard");
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Could not load leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4 text-center">🏆 Leaderboard</h2>
      {leaderboard.map((user, index) => (
        <motion.div
          key={user.userId}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="mb-3 shadow-sm border-primary">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={2} md={1}>
                  <div className="bg-primary text-white rounded-circle text-center" style={{ width: 40, height: 40, lineHeight: "40px", fontWeight: "bold" }}>
                    {index + 1}
                  </div>
                </Col>
                <Col xs={2} md={1}>
                  <img
                    src={user.profileImage || placeholderImage} 
                    alt="profile"
                    className="rounded-circle"
                    style={{ width: 40, height: 40 }}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <h5 className="mb-0">{user.name}</h5>
                  <small className="text-muted">@{user.username}</small>
                </Col>
                <Col xs={12} md={4} className="text-md-end mt-2 mt-md-0">
                  <h5 className="text-primary">{user.totalPoints} pts</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </Container>
  );
};

export default Leaderboard;

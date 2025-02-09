import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FaBell, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaBars, FaGraduationCap, FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const EduTrackNavbar = ({ user }) => {
  const isLoggedIn = user? true: false;
  const role = user?.role || "guest";

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={navVariants} initial="hidden" animate="visible">
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-lg">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <FaGraduationCap size={30} style={{ marginRight: "10px" }} />
            EduTrack
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav">
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about">About</Nav.Link>
              {role === "teacher" ? (
                <Nav.Link href="/create-course">Create Course</Nav.Link>
              ) : role === "student" ? (
                <Nav.Link href="/browse-courses">Browse Courses</Nav.Link>
              ) : null}
            </Nav>
            <Form className="d-flex me-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light">Search</Button>
            </Form>
            <Nav className="ms-auto">
              <Nav.Link href="/notifications">
                <FaBell />
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <Nav.Link href="/profile">
                    <FaUserCircle /> Profile
                  </Nav.Link>
                  <Nav.Link href="/logout">
                    <FaSignOutAlt /> Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">
                    <FaSignInAlt /> Login
                  </Nav.Link>
                  <Nav.Link href="/signup">
                    <FaUserPlus /> Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default EduTrackNavbar;

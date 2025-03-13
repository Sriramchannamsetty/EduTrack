import React, { useState, useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Spinner,
} from "react-bootstrap";
import {
  FaBell,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaBars,
  FaGraduationCap,
  FaUserCircle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthUser } from "../../store/Auth-store";
import SearchBox from "./SearchBox";
import "./Navbar.css";
import { useNavigate } from "react-router";

const EduTrackNavbar = () => {
  const navigate=useNavigate();
  const { user, loading, logout } = useContext(AuthUser);
  const isLoggedIn = !!user;
  const role = user?.role || "guest";

 

  return (
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
          {loading ? (
            <div className="w-100 text-center py-2">
              <Spinner animation="border" variant="light" />
              <span className="ms-2 text-white">Loading...</span>
            </div>
          ) : (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/about">About</Nav.Link>
                {role === "teacher" ? (
                  <Nav.Link href="/create-course">Create Course</Nav.Link>
                ) : role === "student" ? (
                  <Nav.Link href="/browse-courses">Browse Courses</Nav.Link>
                ) : null}
              </Nav>

              {/* Search Box with Functionality */}
              <SearchBox  />

              <Nav className="ms-auto">
                <Nav.Link href="/notifications">
                  <FaBell />
                </Nav.Link>
                {isLoggedIn ? (
                  <>
                    <Nav.Link href="/profile">
                      <FaUserCircle /> Profile
                    </Nav.Link>
                    <Button
                      variant="link"
                      className="nav-link p-0"
                      onClick={logout}
                    >
                      <FaSignOutAlt /> Logout
                    </Button>
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
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default EduTrackNavbar;


import React, { useContext, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import {
  FaBell,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaBars,
  FaGraduationCap,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthUser } from "../../store/Auth-store";
import { NotificationContext } from "../../store/NotificationContext";
import SearchBox from "./SearchBox";
import "./Navbar.css";
import { useNavigate } from "react-router";

const EduTrackNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, loading, logout } = useContext(AuthUser);
  const { notifications, markAllSeen, deleteNotification } =
    useContext(NotificationContext);

  const isLoggedIn = !!user;
  const role = user?.role || "guest";

  const unseenCount = notifications.filter((n) => !n.seen).length;

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-lg px-3">
      <Container fluid className="d-flex align-items-center">
        {/* Sidebar Toggle */}
        <Button
          variant="link"
          className="text-white me-3 p-0"
          style={{ fontSize: "1.3rem" }}
          onClick={toggleSidebar}
        >
          <FaBars />
        </Button>

        {/* Brand */}
        <Navbar.Brand href="/" className="d-flex align-items-center me-auto">
          <FaGraduationCap size={30} style={{ marginRight: "10px" }} />
          EduTrack
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
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

              <SearchBox />

              <Nav className="ms-auto align-items-center">
                {/* 🔔 Notification Dropdown */}
                <Dropdown align="end" onToggle={(isOpen) => isOpen && markAllSeen()}>
                  <Dropdown.Toggle
                    variant="link"
                    className="text-white position-relative"
                  >
                    <FaBell
                      size={20}
                      color={unseenCount > 0 ? "red" : "white"}
                    />
                    {unseenCount > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          background: "red",
                          borderRadius: "50%",
                          color: "white",
                          fontSize: "0.7rem",
                          padding: "2px 5px",
                        }}
                      >
                        {unseenCount}
                      </span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ minWidth: "250px" }}>
                    {notifications.length === 0 ? (
                      <Dropdown.ItemText>No notifications</Dropdown.ItemText>
                    ) : (
                      notifications.map((n) => (
                        <Dropdown.ItemText
                          key={n.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span>{n.msg}</span>
                          <FaTimes
                            style={{
                              cursor: "pointer",
                              marginLeft: "10px",
                              color: "gray",
                            }}
                            onClick={() => deleteNotification(n.id)}
                          />
                        </Dropdown.ItemText>
                      ))
                    )}
                  </Dropdown.Menu>
                </Dropdown>

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

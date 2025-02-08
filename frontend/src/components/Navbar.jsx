import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa"; // React Icons for search, bell, user
import { FaGraduationCap } from "react-icons/fa"; // Education Icon

const NavbarComponent = ({ user }) => {
  const [search, setSearch] = useState(""); // State for the search box
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage mobile nav toggle

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="navbar">
      <Container fluid>
        {/* Logo Section */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaGraduationCap size={30} className="mr-2" /> EduTrack
        </Navbar.Brand>

        {/* Hamburger Toggle Button */}
        <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setIsNavOpen(!isNavOpen)} />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav" className={`justify-content-between ${isNavOpen ? "show" : ""}`}>
          {/* Left Links */}
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            {user?.role === "teacher" ? (
              <Nav.Link as={Link} to="/create-course">Create Course</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/browse-courses">Browse Courses</Nav.Link>
            )}
          </Nav>

          {/* Right Side: Search Box and Icons */}
          <Nav className="d-flex align-items-center">
            {/* Search Box and Icon */}
            <Form inline className="d-flex align-items-center">
              <FormControl
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
                className="search-box mr-2"
              />
              <Button variant="outline-primary" className="d-flex align-items-center">
                <FaSearch />
              </Button>
            </Form>

            {/* Notifications and Profile Icons */}
            <div className="ml-3 d-flex align-items-center">
              <FaBell size={20} className="mr-3" />
              {user ? (
                <div className="d-flex align-items-center">
                  <FaUserCircle size={20} className="mr-2" />
                  <Button variant="outline-danger" >Logout</Button>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <Link to="/login">
                    <Button variant="outline-primary">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline-secondary" className="ml-2">Signup</Button>
                  </Link>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

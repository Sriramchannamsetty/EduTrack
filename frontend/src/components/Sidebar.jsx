import React, { useState } from "react";
import { FaBook, FaTasks, FaTrophy, FaUserCircle, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300 } },
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="toggle-button btn btn-primary"
          style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1050 }}
          onClick={toggleSidebar}
        >
          <FaBars size={20} />
        </button>
      )}
      <motion.div
        className="sidebar bg-primary text-white d-flex flex-column p-3"
        initial="open"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1040,
        }}
      >
        <div className="sidebar-header mb-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaUserCircle size={30} style={{ marginRight: "10px" }} />
            <h4>Menu</h4>
          </div>
          <FaBars size={20} style={{ cursor: "pointer" }} onClick={toggleSidebar} />
        </div>
        <nav className="nav flex-column">
          <a href="/courses" className="nav-link text-white d-flex align-items-center mb-3">
            <FaBook size={20} style={{ marginRight: "10px" }} /> Courses
          </a>
          <a href="/assignments" className="nav-link text-white d-flex align-items-center mb-3">
            <FaTasks size={20} style={{ marginRight: "10px" }} /> Assignments
          </a>
          <a href="/leaderboard" className="nav-link text-white d-flex align-items-center mb-3">
            <FaTrophy size={20} style={{ marginRight: "10px" }} /> Leaderboard
          </a>
          <a href="/profile" className="nav-link text-white d-flex align-items-center mb-3">
            <FaUserCircle size={20} style={{ marginRight: "10px" }} /> Profile
          </a>
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
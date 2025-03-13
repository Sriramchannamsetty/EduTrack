import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaBook, FaTasks, FaTrophy, FaUserCircle } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
        initial={{ width: isOpen ? "250px" : "60px" }}
        animate={{ width: isOpen ? "250px" : "60px" }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          {isOpen && (
            <div className="d-flex align-items-center">
              <FaUserCircle size={30} style={{ marginRight: "10px" }} />
              <h4>Menu</h4>
            </div>
          )}
          <FaBars size={20} style={{ cursor: "pointer" }} onClick={toggleSidebar} />
        </div>
        <nav className="nav flex-column">
          <Link to="/courses" className="nav-link">
            <FaBook /> {isOpen && "Courses"}
          </Link>
          <Link to="/assignment-list" className="nav-link">
            <FaTasks /> {isOpen && "Assignments"}
          </Link>
          <Link to="/leaderboard" className="nav-link">
            <FaTrophy /> {isOpen && "Leaderboard"}
          </Link>
          <Link to="/profile" className="nav-link">
            <FaUserCircle /> {isOpen && "Profile"}
          </Link>
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;

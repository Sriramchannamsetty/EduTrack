import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBook, FaTasks, FaTrophy, FaUserCircle } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  return (
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
  );
};

export default Sidebar;

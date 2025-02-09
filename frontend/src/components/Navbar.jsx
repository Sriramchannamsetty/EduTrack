import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaBell, FaUserCircle, FaGraduationCap, FaSignOutAlt } from "react-icons/fa";
import { Menu } from "lucide-react";
import "./Navbar.css"
const Navbar = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="navbar"
        >
            {/* Left Section - Logo & Course Link */}
            <div className="left-section">
                <Link to="/" className="logo">
                    <FaGraduationCap size={28} className="icon" />
                    <span>EduTrack</span>
                </Link>

                {user ? (
                    <Link to={user.role == "teacher" ? "/create-course" : "/browse-courses"} className="nav-link">
                        {user.role == "teacher" ? "Create Course" : "Browse Courses"}
                    </Link>
                ) : null}
            </div>

            {/* Search Box Centered */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-box"
                />
                <motion.div whileHover={{ scale: 1.1 }} className="search-icon">
                    <FaSearch size={20} />
                </motion.div>
            </div>

            {/* Right Side Icons */}
            <div className="nav-icons">
                <motion.div whileHover={{ scale: 1.1 }} className="icon-box">
                    <FaBell size={20} />
                </motion.div>

                {user ? (
                    <>
                        <motion.div whileHover={{ scale: 1.1 }} className="icon-box">
                            <FaUserCircle size={24} />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="icon-box">
                            <FaSignOutAlt size={20} />
                        </motion.div>
                    </>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/signup" className="signup-btn">Signup</Link>
                        <Link to="/login" className="login-btn">Login</Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
            >
                <Menu size={25} />
            </motion.button>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mobile-menu"
                >
                    {user ? (
                        <>
                            <Link to={user.role === "teacher" ? "/create-course" : "/browse-courses"}>
                                {user.role === "teacher" ? "Create Course" : "Browse Courses"}
                            </Link>
                            <Link to="/profile">Profile</Link>
                            <button className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="signup-btn">Signup</Link>
                            <Link to="/login" className="login-btn">Login</Link>
                        </>
                    )}
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;

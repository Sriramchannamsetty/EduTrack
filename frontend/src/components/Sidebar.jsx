import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Home, Book, List, User, Trophy, Menu } from "lucide-react";
import "./sidebar.css"
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const sidebarVariants = {
        open: { width: "250px", opacity: 1 },
        closed: { width: "70px", opacity: 0.8 }
    };

    const menuItems = [
        { name: "Courses", icon: <Book />, path: "/courses" },
        { name: "Assignments", icon: <List />, path: "/assignments" },
        { name: "Leaderboard", icon: <Trophy />, path: "/leaderboard" },
        { name: "Profile", icon: <User />, path: "/profile" }
    ];

    return (
        <motion.div
            className="sidebar bg-primary text-white d-flex flex-column p-3"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={sidebarVariants}
            transition={{ duration: 0.4 }}
            style={{ height: "100vh", position: "fixed", top: 0, left: 0, overflowX: "hidden" }}
        >
            <motion.button
                className="toggle-btn btn btn-light mb-4"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
            >
                <Menu />
            </motion.button>

            <ul className="list-unstyled">
                {menuItems.map((item, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <NavLink to={item.path} className="nav-link text-white d-flex align-items-center py-2">
                            {item.icon}
                            <motion.span
                                className="ms-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isOpen ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {item.name}
                            </motion.span>
                        </NavLink>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Sidebar;

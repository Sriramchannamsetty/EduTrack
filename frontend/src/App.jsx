import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Spinner } from "react-bootstrap";
import { AuthProvider, AuthUser } from "../store/Auth-store"; // Import AuthProvider
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

// Separate AppContent to use useContext safely inside AuthProvider
const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { loading } = useContext(AuthUser);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          {loading ? (
            <div className="loading-container">
              <Spinner animation="border" variant="primary" />
              <span className="ms-2">Loading content...</span>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

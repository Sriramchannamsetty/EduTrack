import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import EduTrackNavbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Spinner } from "react-bootstrap";
import { AuthProvider, AuthUser } from "../store/Auth-store";
import { FlashProvider } from "../store/FlashContext";
import { NotificationProvider } from "../store/NotificationContext";
import FlashMessage from "./components/FlashMessage";
import "./App.css";

const App = () => {
  return (
    <FlashProvider>
      <AuthProvider>
        <NotificationProvider>
        <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </FlashProvider>
  );
};

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { loading } = useContext(AuthUser);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="app">
      <EduTrackNavbar toggleSidebar={toggleSidebar} />

      <div className="content-container">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          {loading ? (
            <div className="loading-container">
              <Spinner animation="border" variant="primary" />
              <span className="ms-2">Loading content...</span>
            </div>
          ) : (
            <>
              <FlashMessage />
              <Outlet />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css"; // Import styles

import { AuthUser } from "../store/Auth-store";
import { useContext } from "react";
import { Spinner } from "react-bootstrap";

const App = () => {
  const { loading } = useContext(AuthUser);

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="content">
          {loading ? (
            <div className="loading-container">
              <Spinner animation="border" variant="primary" />
              <span className="ms-2">Loading content...</span>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;

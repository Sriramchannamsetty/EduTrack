import { Outlet } from "react-router-dom";
import { AuthProvider } from "../store/Auth-store";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css"; // Import styles

const App = () => {
  const user={role:"teacher"};
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <div className="content-wrapper">
          <Sidebar />
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;

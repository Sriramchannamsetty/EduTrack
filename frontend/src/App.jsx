import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../store/Auth-store"; // Import AuthProvider
import AuthForm from "./components/AuthForm";
import Home from "./components/home";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const user={role:"teacher"}
  return (
    <AuthProvider> 

      <Router>
        <Routes>
          {/* <Route path="/" element={} />*/}
          <Route path="/home" element={< Home/>} />
          <Route path="/navbar" element={< Navbar user/>} />
          {/*<Route path="/courses" element={} />
          <Route path="/assignments" element={} />
          <Route path="/schedule" element={} />
          <Route path="/leaderboard" element={} /> */}
          <Route path="/login" element={<AuthForm heading="Login"/>} />
          <Route path="/signup" element={<AuthForm heading="Sign Up"/>} />
          {/* <Route path="/browse" element={} /> */}
          

          

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


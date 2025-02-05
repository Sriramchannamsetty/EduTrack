import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../store/Auth-store"; // Import AuthProvider
import AuthForm from "./components/AuthForm";

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          {/* <Route path="/" element={} />
          <Route path="/profile" element={} />
          <Route path="/courses" element={} />
          <Route path="/assignments" element={} />
          <Route path="/schedule" element={} />
          <Route path="/leaderboard" element={} /> */}
          <Route path="/login" element={<AuthForm />} />
          {/* <Route path="/browse" element={} /> */}
          

          

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useFlash } from "./FlashContext"; // adjust the path as needed

const AuthUser = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showFlash } = useFlash();

  async function getMe() {
    try {
      const res = await fetch("http://localhost:5000/api/auth/getMe", {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        setUser(null);
        if (data.error) showFlash(data.error, "error");
      }
    } catch (err) {
      showFlash("Unable to fetch user", "error");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  async function authenticate(endpoint, body) {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        showFlash(data.error || "Authentication failed", "error");
        return;
      }

      setUser(data);
      showFlash(data.message || "Success", "success");
    } catch (error) {
      showFlash("Something went wrong!", "error");
    }
  }

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setUser(null);
        navigate("/");
        showFlash(data.message || "Logged out", "success");
      } else {
        showFlash(data.error || "Logout failed", "error");
      }
    } catch (err) {
      showFlash("Error during logout", "error");
    }
  };

  return (
    <AuthUser.Provider value={{ user, setUser, authenticate, logout, loading, setLoading, getMe }}>
      {children}
    </AuthUser.Provider>
  );
};

export { AuthUser, AuthProvider };


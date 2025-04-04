import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthUser = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  async function getMe() {
    try {
      const res = await fetch("http://localhost:5000/api/auth/getMe", { credentials: "include" });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("Error fetching user:", err);
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
            headers: { "Content-Type": "application/json; charset=utf-8" },
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Response:", data);

        setUser(data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
   }

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", { method: "POST", credentials: "include" });
      if (res.ok) {
        setUser(null);
        navigate("/")
      } else {
        console.log("Logout failed");
      }
    } catch (err) {
      console.log("Error during logout:", err);
    }
  };

  return (
    <AuthUser.Provider value={{ user, setUser, authenticate,logout, loading,setLoading,getMe }}>
      {children}
    </AuthUser.Provider>
  );
};

export { AuthUser, AuthProvider };

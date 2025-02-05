import { createContext, useState } from "react";

const AuthUser = createContext(); 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  return (
    <AuthUser.Provider value={{ user, setUser }}>
      {children} 
    </AuthUser.Provider>
  );
};

export { AuthUser, AuthProvider }; 

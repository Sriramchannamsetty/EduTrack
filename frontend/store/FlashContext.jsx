import { createContext, useContext, useState } from "react";

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [flash, setFlash] = useState(null);

  const showFlash = (msg, type = "info") => {
    setFlash({ msg, type });
    setTimeout(() => setFlash(null), 3000); // Auto-dismiss after 3s
  };

  return (
    <FlashContext.Provider value={{ flash, showFlash, setFlash }}>
      {children}
    </FlashContext.Provider>
  );
};

export const useFlash = () => {
  return useContext(FlashContext);
};

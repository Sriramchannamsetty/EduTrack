import { useFlash } from "../../store/FlashContext"; // Adjust path as needed
import { useState, useEffect } from "react";

export default function FlashMessage() {
  const { flash, setFlash } = useFlash();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (flash) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setFlash(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flash, setFlash]);

  if (!flash || !visible) return null;

  const handleClose = () => {
    setVisible(false);
    setFlash(null);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "1rem 2rem",
        borderRadius: "8px",
        color: "#fff",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        zIndex: 9999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        backgroundColor:
          flash.type === "success"
            ? "#28a745"
            : flash.type === "error"
            ? "#dc3545"
            : flash.type === "info"
            ? "#17a2b8"
            : "#6c757d", // default (gray)
      }}
    >
      {flash.msg} <span style={{ marginLeft: "1rem", fontWeight: "bold" }}>×</span>
    </div>
  );
}


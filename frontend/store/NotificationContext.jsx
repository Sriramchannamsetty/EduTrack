import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthUser } from "./Auth-store";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthUser);
  const [notifications, setNotifications] = useState([]); // {id, msg, seen}
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) return;

    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
    });
    setSocket(newSocket);

    if (user.courses && user.courses.length > 0) {
      user.courses.forEach((c) => {
        newSocket.emit("joinCourse", c.course.toString());
      });
    }

    newSocket.on("newAssignment", (data) => {
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), msg: data.message, seen: false }, // add unseen notification
      ]);
      console.log("got notification ", data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // mark all notifications seen
  const markAllSeen = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
  };

  // delete single notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, markAllSeen, deleteNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };

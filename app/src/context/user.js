// Required
import { createContext, useEffect, useState } from "react";

// Socket
import { io } from "socket.io-client";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
  }, []);

  const socketInit = async (id) => {
    socket.emit("userInit", id);
    return true;
  };

  return (
    <UserContext.Provider value={{ socketInit, socket }}>
      {children}
    </UserContext.Provider>
  );
};

import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [s, setS] = useState(null);

  const socketInit = (id) => {
    var socket = io("http://localhost:3001");
    socket.emit("userInit", id);
    setS(socket.id);
  };

  const socketLike = () => {};

  return (
    <UserContext.Provider value={{ socketInit, s }}>
      {children}
    </UserContext.Provider>
  );
};

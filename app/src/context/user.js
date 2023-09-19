import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const welcome = () => {
    console.log("Welcome");
  };

  return (
    <UserContext.Provider value={{ welcome }}>{children}</UserContext.Provider>
  );
};

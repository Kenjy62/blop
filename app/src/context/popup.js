"use client";

// Required
import { createContext, useState } from "react";

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState();
  const [data, setData] = useState();

  const togglePopup = (type, data) => {
    setIsOpen(!isOpen);
    setType(type);
    setData(data);
  };

  return (
    <PopupContext.Provider
      value={{ isOpen, setIsOpen, type, setType, data, setData, togglePopup }}
    >
      {children}
    </PopupContext.Provider>
  );
};

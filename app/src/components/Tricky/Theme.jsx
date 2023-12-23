"use client";

// Required
import { useContext } from "react";

// Context
import { ThemeContext } from "../../context/theme";

export default function Theme({ children }) {
  const { themeScheme } = useContext(ThemeContext);

  return (
    <div
      id="theme"
      className={`${themeScheme ? "dark" : ""} h-screen bg-night-300`}
    >
      {children}
    </div>
  );
}

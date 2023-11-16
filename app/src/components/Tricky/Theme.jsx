"use client";

import { useContext } from "react";
import { ThemeContext } from "../../context/theme";

export default function Theme({ children }) {
  const { themeScheme } = useContext(ThemeContext);

  return (
    <div id="theme" className={themeScheme ? "dark" : ""}>
      {children}
    </div>
  );
}

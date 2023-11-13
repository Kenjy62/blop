import { createContext, useEffect, useState, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children, defaultTheme }) => {
  const [themeScheme, setThemeScheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setThemeScheme((prevValue) => !prevValue);
  };

  return (
    <ThemeContext.Provider value={{ themeScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

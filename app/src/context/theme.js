import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children, defaultTheme, defaultColor }) => {
  const [themeScheme, setThemeScheme] = useState(defaultTheme);
  const [colorScheme, setColorScheme] = useState(defaultColor);

  const toggleTheme = () => {
    setThemeScheme((prevValue) => !prevValue);
  };

  const changeColor = (color) => {
    setColorScheme(color);
  };

  return (
    <ThemeContext.Provider
      value={{ themeScheme, toggleTheme, colorScheme, changeColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

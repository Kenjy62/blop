import { useContext } from "react";
import { ThemeContext } from "../context/theme";

export default function useColorTheme() {
  const { themeScheme } = useContext(ThemeContext);

  return themeScheme;
}

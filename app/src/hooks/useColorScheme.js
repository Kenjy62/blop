import { useContext } from "react";
import { ThemeContext } from "../context/theme";

export function useColorScheme() {
  const { colorScheme } = useContext(ThemeContext);

  return colorScheme;
}

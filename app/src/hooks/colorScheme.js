import { useContext } from "react";

import { ThemeContext } from "../context/theme";

export function CheckColorScheme() {
  const { colorScheme } = useContext(ThemeContext);

  return colorScheme;
}

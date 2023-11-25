"use client";

import { UserProvider } from "./user";
import { SearchProvider } from "./search";
import { ThemeProvider } from "./theme";

export default function Provider({ children, defaultTheme, defaultColor }) {
  return (
    <ThemeProvider defaultTheme={defaultTheme} defaultColor={defaultColor}>
      <UserProvider>
        <SearchProvider>{children}</SearchProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

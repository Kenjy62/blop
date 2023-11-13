"use client";

import { UserProvider } from "./user";
import { SearchProvider } from "./search";
import { ThemeProvider } from "./theme";

export default function Provider({ children, defaultTheme }) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <UserProvider>
        <SearchProvider>{children}</SearchProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

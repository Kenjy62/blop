"use client";

// Providers List
import { UserProvider } from "./user";
import { SearchProvider } from "./search";
import { ThemeProvider } from "./theme";
import { PopupProvider } from "./popup";

export default function Provider({ children, defaultTheme, defaultColor }) {
  return (
    <ThemeProvider defaultTheme={defaultTheme} defaultColor={defaultColor}>
      <UserProvider>
        <PopupProvider>
          <SearchProvider>{children}</SearchProvider>
        </PopupProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

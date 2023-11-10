"use client";

import { UserProvider } from "./user";
import { SearchProvider } from "./search";

export default function Provider({ children }) {
  return (
    <UserProvider>
      <SearchProvider>{children}</SearchProvider>
    </UserProvider>
  );
}

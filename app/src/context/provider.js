"use client";

import { UserProvider } from "./User";

export default function Provider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

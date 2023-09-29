"use client";

import { UserProvider } from "./user";

export default function Provider({ children, user }) {
  return <UserProvider user={user}>{children}</UserProvider>;
}

"use server";

import { cookies } from "next/headers";

export default async function isLogged() {
  const already = cookies().get("token")?.value;

  if (already) {
    return true;
  } else {
    return false;
  }
}

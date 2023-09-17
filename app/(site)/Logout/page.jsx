"use client";

import { Logout } from "@/app/src/features/logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    Logout();
    router.push("/");
  }, []);

  return null;
}

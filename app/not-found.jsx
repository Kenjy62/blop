"use client";

// Actions
import { Logout } from "@/app/src/features/user";

// Required
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    Logout();
    router.push("/");
  }, []);

  return null;
}

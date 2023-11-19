"use client";

// Required
import { useRouter } from "next/navigation";

// Components
import Button from "../UI/Button/Button";

export default function ComponentError({ message }) {
  const router = useRouter();

  return (
    <div className="w-full justify-center items-center flex flex-col gap-4">
      <span>{message}</span>
      <div onClick={() => router.refresh()}>
        <Button>Refresh</Button>
      </div>
    </div>
  );
}

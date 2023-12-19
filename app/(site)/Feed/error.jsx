"use client"; // Error components must be Client Components

// Components
import Button from "@/app/src/components/UI/Button/Button";

// Required
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h2>{error.message}</h2>
      <div
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        <Button>Refresh</Button>
      </div>
    </div>
  );
}

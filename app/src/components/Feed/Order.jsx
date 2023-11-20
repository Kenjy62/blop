"use client";

// Required
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Order({ selected }) {
  const router = useRouter();
  const [active, setActive] = useState(!selected ? "All" : selected);

  return (
    <div className="flex justify-end dark:text-black">
      <select
        value={!selected ? "All" : selected}
        id="feedOrder"
        onChange={(e) => router.push(`?order=${e.currentTarget.value}`)}
      >
        <option value="All">All</option>
        <option value="Followed">Follow</option>
      </select>
    </div>
  );
}

"use client";

// Required
import { useParams } from "next/navigation";

// Components
import Item from "../Profil/Tabs/Item";

export default function Tabs() {
  const { name } = useParams();

  return (
    <div className="flex flex-row gap-4 border-t border-b dark:border-night-200">
      <Item name={name} />
    </div>
  );
}

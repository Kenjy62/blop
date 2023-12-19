// Required
import { usePathname } from "next/navigation";

export default function Type({ type }) {
  const pathname = usePathname();

  return (
    <span className="text-sm">
      {pathname.includes("/Likes")
        ? "has liked"
        : type === "post"
        ? "has posted"
        : "has shared"}
    </span>
  );
}

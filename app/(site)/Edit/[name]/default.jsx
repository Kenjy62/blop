import Nav from "@/app/src/components/User/Setting/Nav";
import Link from "next/link";

export default function Default({ params }) {
  const { name } = params;

  return (
    <div className="w-[200px] h-fit border rounded-lg p-4 flex flex-col gap-2">
      <Nav name={name} />
    </div>
  );
}

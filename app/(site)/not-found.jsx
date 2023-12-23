import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Link href="/Logout">Go to Logout</Link>
    </div>
  );
}

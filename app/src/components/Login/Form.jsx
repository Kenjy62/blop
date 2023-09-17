"use client";

// Required
import { useRouter } from "next/navigation";

// Actions
import { Login } from "../../features/login";

export default function Form() {
  const router = useRouter();

  async function handleSubmit(formData) {
    const response = await Login(formData);
    console.log(response);
    if (response !== null) {
      router.push("/Feed");
    }
    if (response === null) alert("Error");
  }

  return (
    <form className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          className="border p-1"
          name="email"
          type="text"
          placeholder="email@example.com"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input className="p-1" name="password" type="text" placeholder="****" />
      </div>
      <div className="flex justify-center">
        <button
          className="py-1 px-3 h-fit bg-watermelon-400 text-white rounded-lg w-fit hover:bg-watermelon-500 cursor-pointer"
          formAction={handleSubmit}
        >
          Log In
        </button>
      </div>
    </form>
  );
}

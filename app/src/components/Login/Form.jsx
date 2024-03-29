"use client";

// Required
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

// Features
import { Login } from "../../features/user";

// Components
import { Error } from "../UI/Globals/Alert";

export default function Form() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData) {
    startTransition(async () => {
      const { data, message, status } = await Login(formData);
      if (status !== 400) {
        router.push("/Feed");
      }
      if (status === 400) setError(message);
    })
  }

  return (
    <form className="flex flex-col gap-4 p-4 border rounded-lg bg-white md:bg-none">
      {error && <Error>{error}</Error>}
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
        <input className="p-1" name="password" type="password" placeholder="****" />
      </div>
      <div className="flex justify-center">
        <button
          className="py-1 px-3 h-fit bg-watermelon-400 text-white rounded-lg w-fit hover:bg-watermelon-500 cursor-pointer"
          formAction={handleSubmit}
        >
          {isPending ? 'Loading..' : 'Login'}
        </button>
      </div>
    </form>
  );
}

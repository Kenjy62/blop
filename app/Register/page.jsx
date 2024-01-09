// Components
import Form from "../src/components/Register/Form";
import Title from "../src/components/UI/Title/Title";

// Required
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="w-full h-screen flex md:flex-row">
        <div className="flex-1 h-full hidden md:block bg-watermelon-400"></div>
        <div className="flex-1 h-full bg-watermelon-400 md:bg-white flex flex-col gap-4 justify-center items-center">
          <Title>Register</Title>
          <Form />
          <div className="flex justify-center">
            <Link href="/" className="text-white md:text-black">Or Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

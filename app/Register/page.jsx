// Components
import Form from "../src/components/Register/Form";
import Title from "../src/components/UI/Title/Title";

// Required
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="w-full h-screen flex flex-row">
        <div className="flex-1 h-full bg-watermelon-400"></div>
        <div className="flex-1 h-full bg-white flex flex-col gap-4 justify-center items-center">
          <Title>Register</Title>
          <Form />
          <div className="flex justify-center">
            <Link href="/">Or Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

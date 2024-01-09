// Components
import Link from "next/link";
import Form from "./src/components/Login/Form";
import Title from "./src/components/UI/Title/Title";

export default function Page() {
  return (
    <>
      <div className="w-full h-screen flex flex-row">
        <div className="flex-1 h-full hidden md:block bg-watermelon-400"></div>
        <div className="flex-1 h-full bg-watermelon-400 md:bg-white flex flex-col gap-4 justify-center items-center">
          <Title>Log In</Title>
          <Form />
          <Link href="/Register" className="text-white md:text-black">Or Register</Link>
        </div>
      </div>
    </>
  );
}

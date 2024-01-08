// Components
import Nav from "@/app/src/components/User/Setting/Nav";

export default function Default({ params }) {
  const { name } = params;

  return (
    <div className="w-full md:w-[200px] h-fit border dark:text-white dark:border-night-200 rounded-lg p-4 flex flex-row md:flex-col gap-2 justify-center md:justify-start">
      <Nav name={name} />
    </div>
  );
}

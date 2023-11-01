import { notFound } from "next/navigation";

export default function Layout(props) {
  if (props.params.name === "Edit") {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {props.children}
      {props.tabs}
    </div>
  );
}

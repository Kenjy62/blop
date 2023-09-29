export default async function Layout(props) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {props.children}
      {props.tabs}
    </div>
  );
}

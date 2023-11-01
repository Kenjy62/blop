export default function Layout(props) {
  return (
    <div className="w-full h-fit flex flex-row gap-4">
      {props.children} {props.tabs}
    </div>
  );
}

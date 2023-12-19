// Components
import Author from "./Author";
import Type from "./Type";

export default function Infos({ type, name }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Author name={name} />
      <Type type={type} />
    </div>
  );
}

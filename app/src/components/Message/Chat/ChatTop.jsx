// Components
import Picture from "../../UI/User/Picture";
import Title from "../../UI/Title/Title";

export default function ChatTop({ picture, name }) {
  return (
    <div className="rounded-t-lg dark:bg-night-300 p-4 flex flex-row gap-4 items-center">
      <Picture
        name={name}
        url={picture}
        style={"h-14 w-14 rounded-full object-cover"}
        link={true}
      />
      <Title>{name}</Title>
    </div>
  );
}

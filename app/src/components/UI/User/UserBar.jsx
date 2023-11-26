// Components
import Picture from "./Picture";
import User from "./User";
import Tools from "./Tools";

// Actions
import { init } from "@/app/src/features/user";
import ComponentError from "../../Error/ComponentError";

export default async function UserBar() {
  const { data, message, status } = await init();

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200) {
    return (
      <div className="flex flex-row-reverse gap-4 items-center">
        <Picture
          name={data.name}
          url={data.picture}
          style={`rounded-full h-10 w-10 object-cover`}
          link={true}
        />
        <User name={data.name} />
        <Tools user={data} />
      </div>
    );
  }
}

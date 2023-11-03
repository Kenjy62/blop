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
      <>
        <Picture name={data.name} url={data.picture} height={40} width={40} />
        <User name={data.name} />
        <Tools user={data} />
      </>
    );
  }
}

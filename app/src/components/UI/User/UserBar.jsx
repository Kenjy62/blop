// Components
import Picture from "./Picture";
import User from "./User";
import Tools from "./Tools";

// Actions
import { init } from "@/app/src/features/user";

export default async function UserBar() {
  const user = await init();

  return (
    <>
      <Picture name={user.name} url={user.picture} />
      <User name={user.name} />
      <Tools />
    </>
  );
}

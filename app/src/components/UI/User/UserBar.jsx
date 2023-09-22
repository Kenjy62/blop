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
      <Picture name={user.name} url={user.picture} height={40} width={40} />
      <User name={user.name} />
      <Tools />
    </>
  );
}

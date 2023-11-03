// Components
import Messages from "./Tools/Messages";
import Notifications from "./Tools/Notifications";

export default function Tools({ user }) {
  return (
    <div className="flex flex-row-reverse gap-4">
      <Notifications user={user} />
      <Messages />
    </div>
  );
}

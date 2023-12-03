// Components
import Messages from "./Tools/Messages";
import Notifications from "./Tools/Notifications";

// Features
import { getNotifications } from "@/app/src/features/user";

export default async function Tools({ user }) {
  const { data, message, status } = await getNotifications(user.id, {
    next: { tags: ["notificationsBar"] },
  });

  return (
    <div className="flex flex-row-reverse gap-4">
      <Notifications user_id={user.id} data={data} />
      <Messages user_id={user.id} data={data} />
    </div>
  );
}

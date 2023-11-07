// Components
import Notifications from "@/app/src/components/Notification/Notifications";

// Feature
import { getNotifications } from "@/app/src/features/user";

export default async function Page() {
  const { data, message, status } = await getNotifications();

  return <Notifications data={data} />;
}

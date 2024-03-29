// Components
import Notifications from "@/app/src/components/Notification/Notifications";

// Feature
import { getNotifications } from "@/app/src/features/user";

export default async function Page() {
  const { data } = await getNotifications(0, {
    next: { tags: ["notifications"] },
  });

  return <Notifications data={data} />;
}

// Features
import { getNotificationsSettings } from "@/app/src/features/user";

// Components
import Setting from "@/app/src/components/User/Setting/Setting";

export default async function Page() {
  const UserSettings = await getNotificationsSettings();

  const settings = [
    {
      name: "Like",
      authorized: UserSettings.like_notification ? true : false,
    },
    {
      name: "Comment",
      authorized: UserSettings.comment_notification ? true : false,
    },
    {
      name: "Message",
      authorized: UserSettings.message_notification ? true : false,
    },
  ];

  return (
    <div className="flex flex-col w-full p-4 gap-4">
      {settings.map((setting) => {
        return <Setting name={setting.name} authorized={setting.authorized} />;
      })}
    </div>
  );
}

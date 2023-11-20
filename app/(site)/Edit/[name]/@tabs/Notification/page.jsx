// Features
import { getNotificationsSettings } from "@/app/src/features/user";

// Components
import Setting from "@/app/src/components/User/Setting/Setting";

export default async function Page() {
  const UserSettings = await getNotificationsSettings();

  const settings = [
    {
      display: "Like Notification Sound",
      name: "Like",
      authorized: UserSettings.like_notification ? true : false,
    },
    {
      display: "Comment Notification Sound",
      name: "Comment",
      authorized: UserSettings.comment_notification ? true : false,
    },
    {
      display: "Message Notification Sound",
      name: "Message",
      authorized: UserSettings.message_notification ? true : false,
    },
  ];

  return (
    <div className="flex flex-col w-full p-4 gap-4">
      {settings.map((setting) => {
        return (
          <Setting
            display={setting.display}
            name={setting.name}
            authorized={setting.authorized}
          />
        );
      })}
    </div>
  );
}

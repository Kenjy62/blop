// Features
import { getNotificationsSettings } from "@/app/src/features/user";

// Components
import Setting from "@/app/src/components/User/Setting/Setting";

export default async function Page() {
  const { data } = await getNotificationsSettings();

  const settings = [
    {
      display: "Like Notification Sound",
      name: "Like",
      authorized: data.like_notification === 1 ? true : false,
    },
    {
      display: "Comment Notification Sound",
      name: "Comment",
      authorized: data.comment_notification === 1 ? true : false,
    },
    {
      display: "Message Notification Sound",
      name: "Message",
      authorized: data.message_notification === 1 ? true : false,
    },
  ];

  return (
    <div className="flex flex-col w-full p-4 gap-4">
      {settings.map((setting, id) => {
        return (
          <Setting
            key={id}
            display={setting.display}
            name={setting.name}
            authorized={setting.authorized}
          />
        );
      })}
      <div className="flex justify-center">(soon)</div>
    </div>
  );
}

// Components
import Setting from "@/app/src/components/User/Setting/Setting";

// Features
import { getConfidentialitySettings } from "@/app/src/features/user";

export default async function Page() {
  const { data, message, status } = await getConfidentialitySettings();

  const settings = [
    {
      display: "Display Follows for other",
      name: "Display Follows",
      authorized: data.display_follow === 1 ? true : false,
    },
    {
      display: "Display Followers for other",
      name: "Display Followers",
      authorized: data.display_follower === 1 ? true : false,
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

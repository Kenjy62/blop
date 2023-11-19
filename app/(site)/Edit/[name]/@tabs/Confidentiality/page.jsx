import Setting from "@/app/src/components/User/Setting/Setting";

export default function Page() {
  const settings = [
    {
      name: "Display Follows",
      authorized: false,
    },
    {
      name: "Display Followers",
      authorized: false,
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

// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import ColorSelector from "@/app/src/components/User/ColorSelector/ColorSelector";
import Avatar from "@/app/src/components/User/Edit/Avatar";
import Cover from "@/app/src/components/User/Edit/Cover";
import Setting from "@/app/src/components/User/Setting/Setting";

// Features
import { GetUserDetails, init } from "@/app/src/features/user";

export default async function Page({ params }) {
  const user = await init();

  if (user.data.name !== params.name) {
    return <p>You do not have permission to do this !</p>;
  }

  if (user.data.name === params.name) {
    const { data, message, status } = await GetUserDetails(params.name);

    if (status === 400) {
      return <ComponentError message={message} />;
    }

    if (status === 200) {
      return (
        <div className="w-full">
          <div className="flex flex-col gap-8">
            <ColorSelector />
            <Setting
              display={"Dark Mode"}
              name={"Dark Mode"}
              authorized={data.darkMode}
            />
            <Setting
              display={"Followed Feed View by Default"}
              name={"Default Feed"}
              authorized={data.followedFeedView}
            />
          </div>
        </div>
      );
    }
  }
}

// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import Button from "@/app/src/components/UI/Button/Button";
import Avatar from "@/app/src/components/User/Edit/Avatar";
import Cover from "@/app/src/components/User/Edit/Cover";
import Setting from "@/app/src/components/User/Setting/Setting";

// Features
import { GetUserDetails, init } from "@/app/src/features/user";

export default async function Page({ params }) {
  const user = await init();

  if (user.data.name !== params.name) {
    return <p>Not accesss</p>;
  }

  if (user.data.name === params.name) {
    const { data, message, status } = await GetUserDetails(params.name);

    if (status === 400) {
      return <ComponentError message={message} />;
    }

    if (status === 200) {
      return (
        <div className="flex-1">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-4">
              <Avatar picture={data.picture} />
              <Cover picture={data.cover} />
            </div>
            <div className="flex flex-col gap-2">
              <div>My Name : {data.name}</div>
              <div>My Location : France</div>
            </div>
            <Setting name={"Dark Mode"} authorized={data.darkMode} />
            <div className="flex justify-end">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      );
    }
  }
}

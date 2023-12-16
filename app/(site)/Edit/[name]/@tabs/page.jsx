// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import Button from "@/app/src/components/UI/Button/Button";
import Form from "@/app/src/components/User/Edit/Account/Form";
import Avatar from "@/app/src/components/User/Edit/Avatar";
import Cover from "@/app/src/components/User/Edit/Cover";

// Features
import { GetUserDetails, init } from "@/app/src/features/user";

export default async function Page({ params }) {
  const user = await init();
  const { data, message, status } = await GetUserDetails(params.name);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-row gap-4">
        <Avatar picture={data.picture} />
        <Cover picture={data.cover} />
      </div>
      <Form data={user.data} />
    </div>
  );
}

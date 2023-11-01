// Components
import Button from "@/app/src/components/UI/Button/Button";
import Avatar from "@/app/src/components/User/Edit/Avatar";
import Cover from "@/app/src/components/User/Edit/Cover";

// Features
import { GetUser } from "@/app/src/features/getUser";

export default async function Page({ params }) {
  const user = await GetUser(params.name);

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <Avatar picture={user.picture} />
          <Cover picture={user.cover} />
        </div>
        <div className="flex flex-col gap-2">
          <div>My Name : {user.name}</div>
          <div>My Location : France</div>
        </div>
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

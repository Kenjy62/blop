// Components
import { Vertical } from "@/app/src/components/UI/Globals/Separators";
import Picture from "@/app/src/components/UI/User/Picture";
import Cover from "@/app/src/components/User/Cover";
import Tabs from "@/app/src/components/User/Tabs";

// Features
import { GetUser } from "@/app/src/features/getUser";

export default async function Default({ tabs, params, searchParams }) {
  const user = await GetUser(params.name);

  return (
    <>
      <div className="w-full">
        <Cover />
        <div className="flex flex-col gap-4 items-center top-[-50px] relative">
          <div className="flex flex-row gap-8 items-end">
            <span>{user.name}</span>
            <Picture
              url={user.picture}
              name={`Cover`}
              height={100}
              width={100}
              border={`border-4 border-white`}
            />
            <span>France</span>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <span>4 Posts</span>
              <span>4 Likes</span>
            </div>
            <Vertical />
            <div className="flex flex-col">
              <span>4 Reposts</span>
              <span>4 Medias</span>
            </div>
          </div>
        </div>
      </div>
      <Tabs />
    </>
  );
}

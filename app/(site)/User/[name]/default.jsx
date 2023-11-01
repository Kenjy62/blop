// TODO Picture image is not same but size is not equal (it's fixed when picture upload was created)

// Components
import { Vertical } from "@/app/src/components/UI/Globals/Separators";
import Picture from "@/app/src/components/UI/User/Picture";
import Cover from "@/app/src/components/User/Cover";
import Tabs from "@/app/src/components/User/Tabs";

// Features
import { GetUser } from "@/app/src/features/getUser";
import { init } from "@/app/src/features/user";

export default async function Default({ params }) {
  const user = await GetUser(params.name);
  const me = await init();

  const repostCount = user.posts.filter((post) => post.type === "share");
  const mediasCount = user.posts.filter((post) => post.picture !== null);

  return (
    <>
      <div className="w-full">
        <Cover
          cover={user.cover}
          isMyProfil={user.id === me.id ? true : false}
        />
        <div className="flex flex-col gap-4 items-center top-[-50px] relative">
          <div className="flex flex-row gap-8 items-end">
            <span>{user.name}</span>
            <Picture
              url={user.picture}
              name={`${user.name} Cover`}
              height={100}
              width={100}
              border={`border-4 border-white`}
            />
            <span>France</span>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <span>{user.posts.length} Posts</span>
              <span>{user.BlopsLiked.length} Likes</span>
            </div>
            <Vertical />
            <div className="flex flex-col">
              <span>{repostCount.length} Reposts</span>
              <span>{mediasCount?.length} Medias</span>
            </div>
          </div>
        </div>
      </div>
      <Tabs />
    </>
  );
}

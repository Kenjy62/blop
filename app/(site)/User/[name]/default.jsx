// Components
import ComponentsError from "@/app/src/components/Error/ComponentError";
import { Vertical } from "@/app/src/components/UI/Globals/Separators";
import Picture from "@/app/src/components/UI/User/Picture";
import Cover from "@/app/src/components/User/Cover";
import Tabs from "@/app/src/components/User/Tabs";

// Features
import { init, GetUserDetails } from "@/app/src/features/user";

export default async function Default({ params }) {
  const { data, message, status } = await GetUserDetails(params.name);

  if (status === 400) {
    return <ComponentsError message={message} />;
  }

  if (status === 200) {
    const me = await init();

    const repostCount = data.posts.filter((post) => post.type === "share");
    const mediasCount = data.posts.filter((post) => post.picture !== null);
    return (
      <>
        <div className="w-full">
          <Cover
            cover={data.cover}
            isMyProfil={data.id === me.data.id ? true : false}
          />
          <div className="flex flex-col gap-4 items-center top-[-50px] relative">
            <div className="flex flex-row gap-8 items-end">
              <span>{data.name}</span>
              <Picture
                url={data.picture}
                name={`${data.name}`}
                style={`w-28 h-28 rounded-full border-4 border-white object-cover`}
              />
              <span>France</span>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <span>{data.posts.length} Posts</span>
                <span>{data.posts_liked.length} Likes</span>
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
}

// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import Feed from "@/app/src/components/Feed/Feed";
import LoadMore from "@/app/src/components/Feed/Loadmore";
import Order from "@/app/src/components/Feed/Order";
import Textarea from "@/app/src/components/Feed/Textarea";

// Features
import { GetAllPost, GetFollowedPost } from "@/app/src/features/post";
import { init } from "@/app/src/features/user";

export default async function Page({ searchParams }) {
  if (!searchParams.order || searchParams.order === "All") {
    const { data, message, status } = await GetAllPost(0, 5);

    if (status === 400) {
      return <ComponentError message={message} />;
    }

    if (status === 200 && data.length > 0) {
      const user = await init();
      return (
        <div className="w-full flex flex-col gap-8 px-2 md:px-0">
          <Textarea />
          <Feed post={data} user={user} order={searchParams?.order} />
        </div>
      );
    }

    if (status === 200 && data.length < 1) {
      return (
        <div className="w-full flex flex-col gap-8 px-2 md:px-0">
          <Textarea />
          <div className="flex justify-center">
            No posts yet, be the first by writing a post with the field just
            above.
          </div>
        </div>
      );
    }
  }

  if (searchParams.order === "Followed") {
    const { data, message, status } = await GetFollowedPost(0, 5);

    if (status === 400) {
      return <ComponentError message={message} />;
    }

    if (status === 200 && data.length > 0) {
      const user = await init();
      return (
        <div className="w-full flex flex-col gap-8 px-2 md:px-0">
          <Textarea />
          <Feed post={data} user={user} order={searchParams?.order} />
        </div>
      );
    }

    if (status === 200 && data.length < 1) {
      return (
        <div className="w-full flex flex-col gap-8 px-2 md:px-0">
          <Textarea />
          <Order selected={searchParams?.order} />
          <div>No followed post for this moment!</div>
        </div>
      );
    }
  }
}

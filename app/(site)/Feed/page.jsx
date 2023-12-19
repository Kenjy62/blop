// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import Feed from "@/app/src/components/Feed/Feed";
import Order from "@/app/src/components/Feed/Order";
import Textarea from "@/app/src/components/Feed/Textarea";
import Message from "@/app/src/components/UI/Globals/Message";

// Features
import { GetAllPost, GetFollowedPost } from "@/app/src/features/post";
import { init } from "@/app/src/features/user";

export default async function Page({ searchParams }) {
  const user = await init();

  if (user.data.followedFeedView && !searchParams.order) {
    const { data, message, status } = await GetFollowedPost(0, 5);

    if (status === 400) {
      return <ComponentError message={message} />;
    }

    if (status === 200 && data.length > 0) {
      const user = await init();
      return (
        <div className="w-full flex flex-col gap-8 px-2 md:px-0">
          <Textarea />
          <Feed post={data} user={user} order={"Followed"} />
        </div>
      );
    }

    if (status === 200 && data.length < 1) {
      return (
        <div className="w-full flex flex-col gap-8 px-2 md:px-0">
          <Textarea />
          <Order selected={"Followed"} />
          <Message>No followed post for this moment!</Message>
        </div>
      );
    }
  }

  if (!searchParams.order || searchParams.order === "All") {
    const { data, message, status } = await GetAllPost(0, 5);

    if (status === 400) {
      return <ComponentError message={message} />;
    }

    if (status === 200 && data.length > 0) {
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
          <Message>
            No posts yet, be the first by writing a post with the field just
            above!
          </Message>
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
          <Message>No followed post for this moment!</Message>
        </div>
      );
    }
  }
}

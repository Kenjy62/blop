// Components
import ComponentError from "@/app/src/components/UI/Error/ComponentError";
import Comments from "@/app/src/components/Feed/Post/Comment/Comments";
import Post from "@/app/src/components/Feed/Post/Post";

// Features
import { GetPostDetails } from "@/app/src/features/post";
import { init } from "@/app/src/features/user";

export default async function Page({ params }) {
  const { data, message, status } = await GetPostDetails(params.id);

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200) {
    const user = await init();

    return (
      <div className="flex flex-col gap-4">
        <Post userId={user.data.id} post={data} />
        <Comments comments={data} />
      </div>
    );
  }
}

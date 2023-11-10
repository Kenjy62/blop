// Features
import { GetUserPostsShared } from "@/app/src/features/user";

// Components
import Post from "@/app/src/components/Feed/Post/Post";
import ComponentError from "@/app/src/components/Error/ComponentError";

export default async function Page({ params }) {
  const { data, message, status } = await GetUserPostsShared(params.name);

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200) {
    return (
      <div className="flex flex-col gap-4">
        {data.length > 0 &&
          data.reverse().map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        {data.length < 1 && (
          <p>The user has not shared any posts to their credit yet</p>
        )}
      </div>
    );
  }
}

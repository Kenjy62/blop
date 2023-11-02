// Features
import { GetUserPosts } from "@/app/src/features/user";
import { init } from "@/app/src/features/user";

// Components
import Post from "@/app/src/components/Feed/Post/Post";
import ComponentError from "@/app/src/components/Error/ComponentError";

export default async function Page({ params }) {
  const { data, message, status } = await GetUserPosts(params.name);

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200) {
    const user = await init();
    return (
      <div className="flex flex-col gap-4">
        {data.length > 0 ? (
          data.reverse().map((post) => {
            return <Post userId={user.data.id} key={post.id} post={post} />;
          })
        ) : (
          <p>The user has no posts to his credit at the moment</p>
        )}
      </div>
    );
  }
}

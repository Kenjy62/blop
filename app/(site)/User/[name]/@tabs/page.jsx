// Features
import Post from "@/app/src/components/Feed/Post/Post";
import { GetUserPost } from "@/app/src/features/getUserPost";
import { init } from "@/app/src/features/user";

export default async function Page({ params }) {
  const post = await GetUserPost(params.name);
  // const user = await init();

  return (
    <div className="flex flex-col gap-4">
      {post.reverse().map((post) => {
        return <Post userId={1} key={post.id} post={post} />;
      })}
    </div>
  );
}

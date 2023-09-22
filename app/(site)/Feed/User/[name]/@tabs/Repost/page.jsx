// Features
import Post from "@/app/src/components/Feed/Post/Post";
import { GetUserRepost } from "@/app/src/features/getUserRepost";

export default async function Page({ params, searchParams }) {
  const post = await GetUserRepost(params.name);

  return (
    <div className="flex flex-col gap-4">
      {post.reverse().map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}

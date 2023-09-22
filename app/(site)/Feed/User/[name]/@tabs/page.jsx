// Features
import Post from "@/app/src/components/Feed/Post/Post";
import { GetUserPost } from "@/app/src/features/getUserPost";

export default async function Page({ params, searchParams }) {
  const post = await GetUserPost(params.name);

  return (
    <div className="flex flex-col gap-4">
      {post.reverse().map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}

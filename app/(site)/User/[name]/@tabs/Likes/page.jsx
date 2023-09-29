// Features
import { init } from "@/app/src/features/user";
import { GetUserPostLiked } from "@/app/src/features/getUserPostLiked";

// Components
import Post from "@/app/src/components/Feed/Post/Post";

export default async function Page({ params }) {
  const user = await init();
  const post = await GetUserPostLiked(params.name);

  return (
    <div className="flex flex-col gap-4">
      {post.length > 0 &&
        post.reverse().map((post) => {
          return <Post userId={user.id} post={post} />;
        })}
      {post.length < 1 && <p>Aucuns posts like pour le moment.</p>}
    </div>
  );
}

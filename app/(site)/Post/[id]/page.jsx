// Components
import Comment from "@/app/src/components/Feed/Post/Comment/Comment";
import Post from "@/app/src/components/Feed/Post/Post";

// Features
import { GetPost } from "@/app/src/features/getPost";
import { init } from "@/app/src/features/user";

export default async function Page({ params }) {
  const post = await GetPost(params.id);
  const user = await init();

  return (
    <div className="flex flex-col gap-4">
      <Post userId={user.id} post={post} />
      {post.Comment.length > 0 && (
        <div className="flex justify-end">Filtered by : Most récent</div>
      )}
      {post.Comment.length > 0 &&
        post.Comment.reverse().map((comment) => {
          return <Comment comment={comment} />;
        })}
      {post.Comment.length < 1 && (
        <div className="flex justify-center">No Comment</div>
      )}
    </div>
  );
}

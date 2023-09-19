// Components
import Comment from "@/app/src/components/Feed/Post/Comment/Comment";
import Post from "@/app/src/components/Feed/Post/Post";

// Features
import { GetPost } from "@/app/src/features/getPost";

export default async function Page({ params }) {
  const post = await GetPost(params.id);

  return (
    <div className="flex flex-col gap-4">
      <Post post={post} />
      <div className="flex justify-end">Filtered by : Most récent</div>
      {post.Comment.reverse().map((comment) => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
}

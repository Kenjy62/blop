// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import Comment from "@/app/src/components/Feed/Post/Comment/Comment";
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
        {data.comments.length > 0 &&
          data.comments.reverse().map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        {data.comments.length < 1 && (
          <div className="flex justify-center">
            No comments yet on this post
          </div>
        )}
      </div>
    );
  }
}

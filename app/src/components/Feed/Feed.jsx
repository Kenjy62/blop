// Actions
import { AllPost } from "../../features/allpost";

// Components
import Post from "./Post/Post";

export default async function Feed() {
  const post = await AllPost();
  return (
    <div className="flex flex-col gap-4">
      {post.reverse().map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}

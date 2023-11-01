// Actions
import { useContext } from "react";
import { AllPost } from "../../features/allpost";

// Components
import Post from "./Post/Post";
import { init } from "../../features/user";

export default async function Feed() {
  const post = await AllPost();
  const user = await init();

  return (
    <>
      <div className="flex flex-col gap-4">
        {post.length > 0 &&
          post
            .reverse()
            .map((post) => <Post key={post.id} userId={user.id} post={post} />)}
        {post.length < 1 && (
          <div className="flex justify-center">
            <p>Aucun post pour le moment</p>
          </div>
        )}
      </div>
    </>
  );
}

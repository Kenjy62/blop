import Post from "./Structure/Post";
import User from "./Structure/User";

export default function Result({ user, post }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1">
        {user?.length > 0
          ? user.map((user) => <User user={user} />)
          : "Aucun résultat dans les utilisateurs"}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {post?.length > 0
          ? post.map((post) => <Post post={post} />)
          : "Aucun post contenant ce mot"}
      </div>
    </div>
  );
}

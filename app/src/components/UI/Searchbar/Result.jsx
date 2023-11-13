import Post from "../../Feed/Post/Post";
import User from "./Structure/User";

export default function Result({ user, post }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1">
        {user?.length > 0
          ? user.map((user) => <User user={user} />)
          : "Aucun résultat dans les utilisateurs"}
      </div>
      <div className="flex-1">
        {post?.length > 0
          ? post.map((post) => {
              return post.content;
            })
          : "Aucun post contenant ce mot"}
      </div>
    </div>
  );
}

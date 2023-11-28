// Components
import PostCardLittle from "../Cards/User/PostCardLittle";
import UserCardBig from "../Cards/User/UserCardBig";

export default function Result({ user, post }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1 flex flex-row flex-wrap gap-4">
        {user?.length > 0
          ? user.map((user) => <UserCardBig user={user} />)
          : "Aucun résultat dans les utilisateurs"}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {post?.length > 0
          ? post.map((post) => <PostCardLittle post={post} />)
          : "Aucun post contenant ce mot"}
      </div>
    </div>
  );
}

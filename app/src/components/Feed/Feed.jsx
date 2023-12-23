// Components
import Post from "./Post/Post";
import Order from "./Order";
import LoadMore from "./Loadmore";

export default function Feed({ post, user, order }) {
  return (
    <div className="flex flex-col gap-4">
      <Order selected={order} />
      <div className="flex flex-col gap-4">
        {order === "Followed" &&
          post.map((post) => (
            <Post key={post.id} userId={user.data.id} post={post} />
          ))}
        {order === "All" &&
          post.map((post) => (
            <Post key={post.id} userId={user.data.id} post={post} />
          ))}
        {!order &&
          post.map((post) => (
            <Post key={post.id} userId={user.data.id} post={post} />
          ))}
        <LoadMore user={user} order={order} />
      </div>
    </div>
  );
}

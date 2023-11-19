// Components
import Post from "./Post/Post";
import Order from "./Order";

export default function Feed({ post, user, order }) {
  return (
    <div className="flex flex-col gap-4">
      <Order selected={order} />
      <div>
        {order === "Followed" &&
          post.map((post) => (
            <Post key={post.id} userId={user.data.id} post={post} />
          ))}
        {order === "All" &&
          post
            .reverse()
            .map((post) => (
              <Post key={post.id} userId={user.data.id} post={post} />
            ))}
        {!order &&
          post
            .reverse()
            .map((post) => (
              <Post key={post.id} userId={user.data.id} post={post} />
            ))}
      </div>
    </div>
  );
}

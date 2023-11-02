// Actions
import { GetAllPost } from "../../features/post";
import { init } from "../../features/user";
import ComponentError from "../Error/ComponentError";

// Components
import Post from "./Post/Post";

export default async function Feed() {
  const { data, message, status } = await GetAllPost();

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200 && data.length > 0) {
    const user = await init();
    return data
      .reverse()
      .map((post) => <Post key={post.id} userId={user.data.id} post={post} />);
  }

  return (
    <p>
      No posts at the moment, you have the honor of writing the very first with
      the text field above
    </p>
  );
}

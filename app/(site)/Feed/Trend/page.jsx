import Post from "@/app/src/components/Feed/Post/Post";
import Title from "@/app/src/components/UI/Title/Title";
import { GetTrend } from "@/app/src/features/post";
import { init } from "@/app/src/features/user";

export default async function Page({ searchParams }) {
  const { data, message, status } = await GetTrend(searchParams.q);

  if (status === 200) {
    const user = await init();
    if (data.length > 0) {
      return (
        <div className="w-full flex flex-col gap-4">
          <Title>Post with : {`#${searchParams.q}`}</Title>
          {data.reverse().map((post) => (
            <Post userId={user.data.id} post={post.post} />
          ))}
        </div>
      );
    }

    if (data.length < 1) {
      return (
        <div className="w-full">
          <p>No result for this hashtag</p>
        </div>
      );
    }
  }

  if (status === 400) {
    return <div className="w-full">{message}</div>;
  }
}

// Components
import ComponentError from "@/app/src/components/UI/Error/ComponentError";
import Post from "@/app/src/components/Feed/Post/Post";
import LoadMore from "@/app/src/components/Feed/Trend/LoadMore";
import Title from "@/app/src/components/UI/Title/Title";

// Features
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
          {data.map((post, id) => (
            <Post key={id} userId={user.data.id} post={post.post} />
          ))}
          <LoadMore query={searchParams.q} user={user} />
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
    return <ComponentError message={message} />;
  }
}

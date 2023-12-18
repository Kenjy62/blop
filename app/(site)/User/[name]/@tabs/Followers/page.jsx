// Features
import {
  getSpecifiqueUserFollowers,
  getUserConfidentialitySettings,
  init,
} from "@/app/src/features/user";

// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import FollowCard from "@/app/src/components/UI/Cards/FollowCard";
import LoadMore from "@/app/src/components/User/LoadMore";

export default async function Page({ params }) {
  const { data, message, status } = await getSpecifiqueUserFollowers(
    params.name,
    0
  );

  const me = await init();

  const userAuthorization = await getUserConfidentialitySettings(params.name);

  if (userAuthorization.data.display_follower === 0) {
    return <p>This user doesn&apos;t allow to display followers</p>;
  }

  if (status === 200 && data.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center gap-8">
          {data.map((item, id) => {
            return <FollowCard key={id} item={item} />;
          })}
          {data.length > 0 && <LoadMore user={me} type="Follower" />}
        </div>
      </div>
    );
  }

  if (status === 200 && data.length < 1) {
    return <p>No follower for this moment</p>;
  }

  if (status === 400) {
    return <ComponentError message={message} />;
  }
}

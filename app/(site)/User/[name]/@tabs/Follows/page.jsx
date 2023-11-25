// Features
import {
  getSpecifiqueUserFollows,
  getUserConfidentialitySettings,
  init,
} from "@/app/src/features/user";

// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import FollowCard from "@/app/src/components/UI/Cards/FollowCard";

export default async function Page({ params }) {
  const { data, message, status } = await getSpecifiqueUserFollows(params.name);
  const userAuthorization = await getUserConfidentialitySettings(params.name);
  const me = await init();

  if (userAuthorization.display_follow === 0) {
    return <p>This user doesn't allow to display follows</p>;
  }

  if (status === 200 && data.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-center gap-8">
          {data.map((item, id) => {
            return (
              <FollowCard
                key={id}
                item={item}
                isMyProfil={params.name === me.data.name ? true : false}
              />
            );
          })}
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
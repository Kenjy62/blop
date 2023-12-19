// Features
import {
  getSpecifiqueUserFollows,
  getUserConfidentialitySettings,
  init,
} from "@/app/src/features/user";

// Components
import ComponentError from "@/app/src/components/UI/Error/ComponentError";
import FollowCard from "@/app/src/components/UI/Cards/FollowCard";
import LoadMore from "@/app/src/components/User/LoadMore";
import Message from "@/app/src/components/UI/Globals/Message";

export default async function Page({ params }) {
  const { data, message, status } = await getSpecifiqueUserFollows(
    params.name,
    0
  );
  const userAuthorization = await getUserConfidentialitySettings(params.name);

  const me = await init();

  if (userAuthorization.data.display_follow === 0) {
    return <Message>This user doesn&apos;t allow to display follows!</Message>;
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
          {data.length > 0 && <LoadMore user={me} type="Follow" />}
        </div>
      </div>
    );
  }

  if (status === 200 && data.length < 1) {
    return <Message>No follower for this moment!</Message>;
  }

  if (status === 400) {
    return <ComponentError message={message} />;
  }
}

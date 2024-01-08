// Components
import ComponentError from "@/app/src/components/UI/Error/ComponentError";
import LoadMore from "@/app/src/components/Profil/LoadMore";
import Media from "@/app/src/components/Profil/Tabs/Media";
import Message from "@/app/src/components/UI/Globals/Message";

// Features
import { GetUserMedias, init } from "@/app/src/features/user";

export default async function Page({ params }) {
  const { data, message, status } = await GetUserMedias(params.name, 0);

  if (status === 200) {
    const user = await init();
    return (
      <div className="w-full flex flex-row gap-4 flex-wrap">
        <Media data={data} />
        {data.length > 0 && <LoadMore profil={params.name} user={user} type="Media" />}
        {data.length < 1 && <Message>No medias for this moment!</Message>}
      </div>
    );
  }

  if (status === 400) {
    return <ComponentError message={message} />;
  }
}

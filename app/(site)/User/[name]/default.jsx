// Components
import ComponentsError from "@/app/src/components/Error/ComponentError";
import { Vertical } from "@/app/src/components/UI/Globals/Separators";
import Picture from "@/app/src/components/UI/User/Picture";
import Cover from "@/app/src/components/User/Cover";
import ProfilStats from "@/app/src/components/User/ProfilStats";
import Tabs from "@/app/src/components/User/Tabs";

// Features
import { init, GetUserDetails } from "@/app/src/features/user";

import { notFound } from "next/navigation";

export default async function Default({ params }) {
  const { data, message, status } = await GetUserDetails(params.name);

  if (status === 400) {
    return notFound();
  }

  if (status === 200) {
    const me = await init();
    const alreadyFollow = data.userFollowed.filter(
      (user) => user.user1_id === me.data.id && user.user2_id === data.id
    );

    return (
      <>
        <div className="w-full">
          <Cover
            cover={data.cover}
            isMyProfil={data.id === me.data.id ? true : false}
            isFollowed={alreadyFollow}
          />
          <div className="flex flex-col gap-4 items-center top-[-50px] relative">
            <div className="flex flex-row gap-8 items-end">
              <span>{data.name}</span>
              <Picture
                url={data.picture}
                name={`${data.name}`}
                style={`w-28 h-28 rounded-full border-4 border-white dark:border-night-300 object-cover`}
              />
              <span>France</span>
            </div>
            <ProfilStats data={data} />
          </div>
        </div>
        <Tabs />
      </>
    );
  }
}

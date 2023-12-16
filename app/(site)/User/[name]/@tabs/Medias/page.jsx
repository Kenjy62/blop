// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import LoadMore from "@/app/src/components/Profil/LoadMore";

// Features
import { GetUserMedias, init } from "@/app/src/features/user";

// Required
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }) {
  const { data, message, status } = await GetUserMedias(params.name, 0);

  if (status === 200) {
    const user = await init();
    return (
      <div className="w-full flex flex-row gap-4 flex-wrap">
        {data.length > 0 &&
          data.map((post) => {
            return post.picture.map((item, id) => {
              return (
                <Link
                  key={id}
                  href={`/Post/${post.id}`}
                  className="w-[calc(100%/4-12px)]"
                >
                  <Image
                    className="rounded-lg border dark:border-night-200 shadow-md"
                    src={item.url}
                    height={500}
                    width={500}
                    alt={`Post Picture`}
                  />
                </Link>
              );
            });
          })}
        {data.length > 0 && <LoadMore user={user} type="Media" />}
        {data.length < 1 && <p>No medias for this moment.</p>}
      </div>
    );
  }

  if (status === 400) {
    return <ComponentError message={message} />;
  }
}

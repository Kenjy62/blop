// Components
import Bookmarks from "@/app/src/components/Bookmark/Bookmarks";
import ComponentError from "@/app/src/components/Error/ComponentError";

// Features
import { GetUserBookmarks } from "@/app/src/features/bookmark";

export default async function Page() {
  const { data, message, status } = await GetUserBookmarks();

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200) {
    const uniqueTags = ["All"];

    data.response.forEach((el) => {
      if (!uniqueTags.includes(el.tag)) {
        uniqueTags.push(el.tag);
      }
    });

    return (
      <>
        {data.response.length > 0 && (
          <Bookmarks
            Tags={uniqueTags}
            BookmarksList={data.response}
            userId={data.user.id}
          />
        )}
        {data.response.length < 1 && (
          <div className="flex justify-center">
            You don&apos;t have any bookmarks at the moment
          </div>
        )}
      </>
    );
  }
}

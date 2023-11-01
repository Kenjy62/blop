// Components
import Bookmarks from "@/app/src/components/Bookmark/Bookmarks";

// Features
import { GetBookmarksTags } from "@/app/src/features/getBookmarksTags";

export default async function Page() {
  const BookmarksList = await GetBookmarksTags();

  const uniqueTags = ["All"];

  BookmarksList.response.forEach((el) => {
    if (!uniqueTags.includes(el.tags)) {
      uniqueTags.push(el.tags);
    }
  });

  return (
    <>
      {BookmarksList.response.length > 0 && (
        <Bookmarks
          Tags={uniqueTags}
          BookmarksList={BookmarksList.response}
          userId={BookmarksList.user.id}
        />
      )}
      {BookmarksList.response.length < 1 && (
        <p>Aucun bookmarks pour le moment...</p>
      )}
    </>
  );
}

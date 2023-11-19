"use client";

// Required
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Components
import Share from "./Share/Share";
import Actions from "./Action";
import Picture from "../../UI/User/Picture";

// Icons
import { RxClock } from "react-icons/rx";

export default function Post({ userId, post }) {
  const now = dayjs();
  const dateDiff = now.diff(post.createdAt, "minute");
  const pathname = usePathname();

  return (
    <div>
      <div className="w-full p-4 pb-8 border rounded-lg flex flex-row gap-4 hover:border-watermelon-200 dark:border-night-200">
        <div className="h-fit">
          <Picture
            name={post.author.name}
            url={post.author.picture}
            link={true}
            style="rounded-full h-14 w-14 object-cover"
          />
        </div>
        <div className="flex flex-col w-full gap-6">
          <Link
            href={`/Post/${post.id}`}
            className="w-full flex flex-col gap-2"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2 items-center">
                <span className="font-medium">{post.author.name} </span>
                <span className="text-sm">
                  {pathname.includes("/Likes")
                    ? "has liked"
                    : post.type === "post"
                    ? "has posted"
                    : "has shared"}
                </span>
              </div>
              <span className="font-light text-xs flex flex-row items-center gap-1">
                <RxClock /> {dayjs(post.createdAt).fromNow()}
              </span>
            </div>
            {post.type === "post" ? (
              <div className="font-normal">{post.content}</div>
            ) : (
              <>
                <div className="font-normal">{post.content}</div>
                <Share post={post.share_data} />
              </>
            )}
          </Link>
          {post.picture.length > 0 && (
            <div className="flex flex-row gap-2">
              {post.picture.map((pic, id) => (
                <div className="flex-1" key={id}>
                  <Link href={`?picture=${pic.url.replace("/Posts/", "")}`}>
                    <Image
                      className="rounded-lg w-full"
                      src={pic.url}
                      width={500}
                      height={500}
                      alt={`post picture`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Actions
        userId={userId}
        postAuthorId={post.author.id}
        postId={post.id}
        comments={post.comment}
        likes={post.likes}
        shares={post.shares}
        Bookmarks={post.bookmarks}
        UsersBookmarks={post.bookmark_data}
        UsersLikes={post.userslist_likes}
        isDeleteable={dateDiff > 5 ? false : true}
        createdAt={post.createdAt}
      />
    </div>
  );
}

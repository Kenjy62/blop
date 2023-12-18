// Required
import Link from "next/link";
import { useContext } from "react";

// Components
import PostCardLittle from "../Cards/User/PostCardLittle";
import UserCardBig from "../Cards/User/UserCardBig";

// Context
import { SearchContext } from "@/app/src/context/search";

export default function Result({ user, post }) {
  const { query, toggle } = useContext(SearchContext);

  return (
    <div className="flex flex-row gap-4">
      {user?.length > 0 ? (
        <div className="flex-1 flex flex-row flex-wrap gap-4">
          {user.map((user, id) => (
            <UserCardBig key={id} user={user} />
          ))}
        </div>
      ) : null}

      {post?.length > 0 ? (
        <div className="flex-1 flex flex-col gap-2">
          {post.map((post, id) => (
            <PostCardLittle key={id} post={post.post} />
          ))}
          {post.length > 10 && (
            <Link onClick={() => toggle()} href={`/Feed/Trend?q=${query}`}>
              Voir plus
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}

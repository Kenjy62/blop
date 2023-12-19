// Components
import Like from "./Action/Like";
import Report from "./Action/Report";
import Delete from "./Action/Delete";
import Bookmark from "./Action/Bookmark";
import Share from "./Action/Share";
import Comment from "./Action/Comment";

export default function Actions({ post, userId }) {
  return (
    <div className="flex flex-row p-4 gap-6 items-center justify-between mt-[-35px]">
      <div className="flex flex-row gap-4">
        <Comment postId={post.id} />
        <Share postId={post.id} />
        <Like post={post} userId={userId} />
        <Bookmark userId={userId} post={post} />
        <Delete userId={userId} post={post} />
        <Report />
      </div>
    </div>
  );
}

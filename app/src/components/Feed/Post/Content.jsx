// Components
import Share from "./Share";

export default function Content({ post }) {
  return post.type === "post" ? (
    <div className="font-normal">{post.content}</div>
  ) : (
    <>
      <div className="font-normal">{post.content}</div>
      <Share post={post.share_data} />
    </>
  );
}

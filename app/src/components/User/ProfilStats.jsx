import { Vertical } from "../UI/Globals/Separators";

export default function ProfilStats({ data }) {
  const followsCount = data.userFollower.length;
  const followersCount = data.userFollowed.length;
  const repostCount = data.posts.filter((post) => post.type === "share");
  const mediasCount = data.posts.reduce(
    (count, post) => count + post.picture.length,
    0
  );

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col">
        <span>{data.posts.length} Posts</span>
        <span>{data.posts_liked.length} Likes</span>
      </div>
      <Vertical />
      <div className="flex flex-col">
        <span>{repostCount.length} Reposts</span>
        <span>{mediasCount ? mediasCount : "0"} Medias</span>
      </div>
      <Vertical />
      <div className="flex flex-col">
        <span>{followsCount} Follows</span>
        <span>{followersCount} Followers</span>
      </div>
    </div>
  );
}

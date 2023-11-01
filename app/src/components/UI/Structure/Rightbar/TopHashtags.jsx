// Components
import { Hashtags } from "@/app/src/features/hashtags";
import Title from "../../Title/Title";

export default async function TopHashtags() {
  const hashtags = await Hashtags({ next: { tags: ["tags"] } });

  return (
    <div className="flex flex-col gap-3">
      <Title>Top Hashtags</Title>
      <div className="border rounded-lg p-4 flex flex-col flex-wrap gap-2">
        {hashtags.length > 0 &&
          hashtags.map((hashtag) => {
            return (
              <div key={hashtag} className="flex flex-col">
                <span className="cursor-pointer">{hashtag[0]}</span>
                <span className="text-xs">{hashtag[1]} Utilisations</span>
              </div>
            );
          })}
        {hashtags.length < 1 && <p>Aucun tophashtag pour le moment</p>}
      </div>
    </div>
  );
}

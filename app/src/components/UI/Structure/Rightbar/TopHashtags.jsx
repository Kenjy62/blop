// Components
import { GetTopHashtags } from "@/app/src/features/sidebar/hashtags";
import Title from "../../Title/Title";
import ComponentError from "../../../Error/ComponentError";

export default async function TopHashtags() {
  const { data, message, status } = await GetTopHashtags({
    next: { tags: ["tags"] },
  });

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200) {
    return (
      <div className="flex flex-col gap-3">
        <Title>Top Hashtags</Title>
        <div className="border rounded-lg p-4 flex flex-col flex-wrap gap-2">
          {data.length > 0 &&
            data.map((hashtag) => {
              return (
                <div key={hashtag} className="flex flex-col">
                  <span className="cursor-pointer">{hashtag[0]}</span>
                  <span className="text-xs">{hashtag[1]} Utilisations</span>
                </div>
              );
            })}
          {data.length < 1 && <p>Aucun tophashtag pour le moment</p>}
        </div>
      </div>
    );
  }
}

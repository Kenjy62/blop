// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

// Components
import Date from "../../../UI/Globals/Date";
import Picture from "../../../UI/User/Picture";
import Content from "./Content";

export default function Item({ comment }) {
  const colorScheme = CheckColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `w-full p-4 border rounded-lg flex flex-row dark:border-night-200 gap-4 hover:border-watermelon-400 dark:hover:border-watermelon-400`;
  } else if (colorScheme === "harlequin") {
    color = `w-full p-4 border rounded-lg flex flex-row dark:border-night-200 gap-4 hover:border-harlequin-400 dark:hover:border-harlequin-400`;
  } else if (colorScheme === "royal-blue") {
    color = `w-full p-4 border rounded-lg flex flex-row dark:border-night-200 gap-4 hover:border-royal-blue-400 dark:hover:border-royal-blue-400`;
  } else if (colorScheme === "fire-bush") {
    color = `w-full p-4 border rounded-lg flex flex-row dark:border-night-200 gap-4 hover:border-fire-bush-400 dark:hover:border-fire-bush-400`;
  } else if (colorScheme === "cinnabar") {
    color = `w-full p-4 border rounded-lg flex flex-row dark:border-night-200 gap-4 hover:border-cinnabar-400 dark:hover:border-cinnabar-400`;
  } else if (colorScheme === "purple-heart") {
    color = `w-full p-4 border rounded-lg flex flex-row dark:border-night-200 gap-4 hover:border-purple-heart-400 dark:hover:border-purple-heart-400`;
  }

  return (
    <div className={color}>
      <div className="h-fit">
        <Picture
          url={comment.author.picture}
          name={comment.author.name}
          link={true}
          style="h-14 w-14 rounded-full cursor-pointer object-cover"
        />
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <span className="font-medium">{comment.author.name}</span>
            <span className="font-light text-xs flex flex-row items-center gap-1">
              <Date date={comment.createdAt} />
            </span>
          </div>
          <Content content={comment.content} />
        </div>
      </div>
    </div>
  );
}

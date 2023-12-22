"use client";

// Required
import Link from "next/link";

// Components
import Picture from "../../UI/User/Picture";
import Date from "../../UI/Globals/Date";

// Hooks
import { useColorScheme } from "@/app/src/hooks/useColorScheme";

export default function Item({ conversation, data }) {
  const colorScheme = useColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `flex flex-col gap-2 dark:bg-night-300 border dark:border-night-200 hover:border-watermelon-400 dark:hover:border-watermelon-400 p-2 rounded-lg`;
  } else if (colorScheme === "harlequin") {
    color = `flex flex-col gap-2 dark:bg-night-300 border dark:border-night-200 hover:border-harlequin-400 dark:hover:border-harlequin-400 p-2 rounded-lg`;
  } else if (colorScheme === "purple-heart") {
    color = `flex flex-col gap-2 dark:bg-night-300 border dark:border-night-200 hover:border-purple-heart-400 dark:hover:border-purple-heart-400 p-2 rounded-lg`;
  } else if (colorScheme === "cinnabar") {
    color = `flex flex-col gap-2 dark:bg-night-300 border dark:border-night-200 hover:border-cinnabar-400 dark:hover:border-cinnabar-400 p-2 rounded-lg`;
  } else if (colorScheme === "royal-blue") {
    color = `flex flex-col gap-2 dark:bg-night-300 border dark:border-night-200 hover:border-royal-blue-400 dark:hover:border-royal-blue-400 p-2 rounded-lg`;
  } else if (colorScheme === "fire-bush") {
    color = `flex flex-col gap-2 dark:bg-night-300 border dark:border-night-200 hover:border-fire-bush-400 dark:hover:border-fire-bush-400 p-2 rounded-lg`;
  }

  return (
    <>
      <div className={color}>
        <div className="flex flex-row gap-4">
          <Picture
            name={
              conversation.participant1.name !== data.name
                ? conversation.participant1.name
                : conversation.participant2.name
            }
            url={
              conversation.participant1.name !== data.name
                ? conversation.participant1.picture
                : conversation.participant2.picture
            }
            style={"h-14 w-14 rounded-full object-cover"}
          />
          <Link
            className="w-full"
            href={`Message/Conversation/${conversation.id}`}
          >
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col gap-2">
                <span>
                  {conversation.participant1.name !== data.name
                    ? conversation.participant1.name
                    : conversation.participant2.name}
                </span>
                <span>{conversation.messages[0].content}</span>
              </div>
              <Date date={conversation.messages[0].createdAt} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

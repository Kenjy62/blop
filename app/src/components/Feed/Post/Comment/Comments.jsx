"use client";

// Components
import Item from "./Item";
import Message from "../../../UI/Globals/Message";

// Hook
import { useColorScheme } from "@/app/src/hooks/useColorScheme";

export default function Comments({ comments }) {
  const colorScheme = useColorScheme();
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

  if (comments.comments.length > 0) {
    return comments.comments.map((comment) => (
      <Item key={comment.id} comment={comment} />
    ));
  } else if (comments.length < 1) {
    return <Message>test</Message>;
  }
}

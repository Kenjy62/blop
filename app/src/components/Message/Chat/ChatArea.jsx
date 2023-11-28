"use client";

// Features
import { send } from "@/app/src/features/chat";

// Required
import { useState } from "react";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function ChatArea({ conversationId, userId }) {
  const [textarea, setTextarea] = useState(""); // Initialiser avec une chaîne vide

  async function sendChat(formData) {
    const { message, status } = await send(formData, conversationId, userId);

    if (status === 200) {
      setTextarea(""); // Réinitialiser le champ de texte après l'envoi du message
    }

    if (status === 400) {
      alert(message);
    }
  }

  const colorScheme = CheckColorScheme();

  var color;
  var bottom;

  if (colorScheme === "Watermelon") {
    color = `py-1 px-3 h-fit bg-watermelon-400 dark:bg-watermelon-400 text-white rounded-lg w-fit cursor-pointer`;
    bottom = `items-center bg-watermelon-300 dark:bg-night-300 p-4 flex flex-row gap-4 justify-between rounded-b-lg`;
  } else if (colorScheme === "harlequin") {
    color = `py-1 px-3 h-fit bg-harlequin-400 dark:bg-harlequin-400 text-white rounded-lg w-fit cursor-pointer`;
    bottom = `items-center bg-harlequin-300 dark:bg-night-300 p-4 flex flex-row gap-4 justify-between rounded-b-lg`;
  } else if (colorScheme === "royal-blue") {
    color = `py-1 px-3 h-fit bg-royal-blue-400 dark:bg-royal-blue-400 text-white rounded-lg w-fit cursor-pointer`;
    bottom = `items-center bg-royal-blue-300 dark:bg-night-300 p-4 flex flex-row gap-4 justify-between rounded-b-lg`;
  } else if (colorScheme === "fire-bush") {
    color = `py-1 px-3 h-fit bg-fire-bush-400 dark:bg-fire-bush-400 text-white rounded-lg w-fit cursor-pointer`;
    bottom = `items-center bg-fire-bush-300 dark:bg-night-300 p-4 flex flex-row gap-4 justify-between rounded-b-lg`;
  } else if (colorScheme === "cinnabar") {
    color = `py-1 px-3 h-fit bg-cinnabar-400 dark:bg-cinnabar-400 text-white rounded-lg w-fit cursor-pointer`;
    bottom = `items-center bg-cinnabar-300 dark:bg-night-300 p-4 flex flex-row gap-4 justify-between rounded-b-lg`;
  } else if (colorScheme === "purple-heart") {
    color = `py-1 px-3 h-fit bg-purple-heart-400 dark:bg-purple-heart-400 text-white rounded-lg w-fit cursor-pointer`;
    bottom = `items-center bg-purple-heart-300 dark:bg-night-300 p-4 flex flex-row gap-4 justify-between rounded-b-lg`;
  }

  return (
    <div className={bottom}>
      <form className="flex flex-row gap-4 w-full items-center">
        <input
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)} // Mettre à jour la valeur du champ de texte
          name="chatarea"
          type="text"
          placeholder="Write your message here.."
          className="dark:bg-night-200 rounded-lg p-2 w-full flex-1"
        />
        <button formAction={sendChat} type="submit" className={color}>
          Send
        </button>
      </form>
    </div>
  );
}

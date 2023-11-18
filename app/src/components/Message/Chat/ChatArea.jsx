"use client";

import { send } from "@/app/src/features/chat";

import { useState } from "react";

// ... (imports)

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

  return (
    <div className="items-center dark:bg-night-300 p-4 flex flex-row gap-4 justify-between">
      <form className="flex flex-row gap-4 w-full items-center">
        <input
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)} // Mettre à jour la valeur du champ de texte
          name="chatarea"
          type="text"
          placeholder="Write your message here.."
          className="dark:bg-night-200 rounded-lg p-2 w-full flex-1"
        />
        <button
          formAction={sendChat}
          type="submit"
          className="py-1 px-3 h-fit bg-watermelon-400 dark:bg-night-200 text-white rounded-lg w-fit hover:bg-watermelon-500 cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}

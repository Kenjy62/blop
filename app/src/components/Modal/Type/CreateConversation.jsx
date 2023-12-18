// Required
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Features
import { newConversation } from "@/app/src/features/chat";

// Components
import Title from "../../UI/Title/Title";
import Picture from "../../UI/User/Picture";
import { ToastError } from "../../UI/Toast/Toasts";

// Toast
import toast from "react-hot-toast";

// Hooks
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function CreateConversation({ userFollowed }) {
  const colorScheme = CheckColorScheme();
  var color;

  if (colorScheme === "Watermelon") {
    color = `dark:bg-night-200 rounded-lg p-2 border dark:border-night-300 focus:border-watermelon-400 dark:focus:border-watermelon-400 outline-none`;
  } else if (colorScheme === "harlequin") {
    color = `dark:bg-night-200 rounded-lg p-2 border dark:border-night-300 focus:border-harlequin-400 dark:focus:border-harlequin-400 outline-none`;
  } else if (colorScheme === "fire-bush") {
    color = `dark:bg-night-200 rounded-lg p-2 border dark:border-night-300 focus:border-fire-bush-400 dark:focus:border-fire-bush-400 outline-none`;
  } else if (colorScheme === "royal-blue") {
    color = `dark:bg-night-200 rounded-lg p-2 border dark:border-night-300 focus:border-royal-blue-400 dark:focus:border-royal-blue-400 outline-none`;
  } else if (colorScheme === "purple-heart") {
    color = `dark:bg-night-200 rounded-lg p-2 border dark:border-night-300 focus:border-purple-heart-400 dark:focus:border-purple-heart-400 outline-none`;
  } else if (colorScheme === "cinnabar") {
    color = `dark:bg-night-200 rounded-lg p-2 border dark:border-night-300 focus:border-cinnabar-400 dark:focus:border-cinnabar-400 outline-none`;
  }

  const router = useRouter();
  const [query, setQuery] = useState();

  const [followed, setFollowed] = useState(userFollowed);

  useEffect(() => {
    if (query?.length > 0) {
      setFollowed(
        followed.filter((user) =>
          user.user2.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFollowed(userFollowed);
    }
  }, [query]);

  async function createConversation(id) {
    const { data, message, status } = await newConversation(id);

    if (status === 200) {
      router.push(`/Message/Conversation/${data.id}`);
    }

    if (status === 400) {
      toast(<ToastError message={message} />, {
        position: "bottom-left",
        style: {
          background: "transparent",
          boxShadow: "none",
          border: "none",
        },
      });
      return;
    }
  }

  if (followed) {
    return (
      <div className="w-full p-4 rounded-lg bg-white dark:text-white text-black dark:bg-night-400 flex flex-col gap-4">
        <Title>Create Conversation</Title>
        <input
          onChange={(e) => {
            router.push(`?searchConversation=${e.currentTarget.value}`);
            setQuery(e.currentTarget.value);
          }}
          type="text"
          placeholder="Search Specifique User"
          className={color}
        />
        <div className="flex flex-row gap-2 flex-wrap justify-center">
          {followed.length > 0 ? (
            followed.slice(0, 5).map((user, id) => (
              <div
                onClick={() => createConversation(user.user2.id)}
                key={id}
                className="flex flex-col items-center gap-2 dark:text-white"
              >
                <Picture
                  name={user.user2.name}
                  url={user.user2.picture}
                  style={`rounded-full h-14 w-14 object-cover cursor-pointer`}
                  link={false}
                />
                <span>{user.user2.name}</span>
              </div>
            ))
          ) : followed.length < 1 && query?.length > 0 ? (
            <p>No result for: {query}</p>
          ) : (
            <p>You are not following any users, please follow a user first.</p>
          )}
        </div>
      </div>
    );
  }

  return <p>error</p>;
}

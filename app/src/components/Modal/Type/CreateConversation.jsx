// Required
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Features
import { newConversation } from "@/app/src/features/chat";

// Components
import Title from "../../UI/Title/Title";
import Picture from "../../UI/User/Picture";

export default function CreateConversation({ userFollowed }) {
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
    router.push(`/Message/Conversation/${data.id}`);
  }

  if (followed) {
    return (
      <div className="w-full p-4 rounded-lg bg-white dark:bg-night-400 flex flex-col gap-4">
        <Title>Create Conversation</Title>
        <input
          onChange={(e) => {
            router.push(`?searchConversation=${e.currentTarget.value}`);
            setQuery(e.currentTarget.value);
          }}
          type="text"
          placeholder="Search Specifique User"
          className="dark:bg-night-200 rounded-lg p-2"
        />
        <div className="flex flex-row gap-2 flex-wrap justify-center">
          {followed.length > 0 ? (
            followed.map((user, id) => (
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
            <p>No result for : {query}</p>
          ) : (
            <p>You are not following any users, please follow a user first.</p>
          )}
        </div>
      </div>
    );
  }

  return <p>error</p>;
}

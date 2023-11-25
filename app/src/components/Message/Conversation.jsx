// Components
import Picture from "../UI/User/Picture";

// Features
import { init } from "../../features/user";

// Required
import Link from "next/link";
import Date from "./Date";

export default async function Conversation({ conversation }) {
  const { data, message, status } = await init();

  return (
    <div className="flex flex-col gap-2 dark:bg-night-300 border dark:border-night-200 p-2 rounded-lg">
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
  );
}

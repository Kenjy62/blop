// Components
import Link from "next/link";
import { init } from "../../features/user";
import Picture from "../UI/User/Picture";

export default async function Conversation({ conversation }) {
  const { data, message, status } = await init();

  return (
    <Link href={`Message/Conversation/${conversation.id}`}>
      <div className="flex flex-col gap-2 dark:bg-night-300 border dark:border-night-200 p-2 rounded-lg">
        <div className="flex flex-row gap-4">
          <Picture
            name={"user avatar name"}
            url={
              conversation.participant1.name !== data.name
                ? conversation.participant1.picture
                : conversation.participant2.picture
            }
            style={"h-14 w-14 rounded-full object-cover"}
          />
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-col gap-2">
              <span>
                {conversation.participant1.name !== data.name
                  ? conversation.participant1.name
                  : conversation.participant2.name}
              </span>
              <span>message</span>
            </div>
            <div>Date</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

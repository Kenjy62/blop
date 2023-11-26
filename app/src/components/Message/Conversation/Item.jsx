// Required
import Link from "next/link";

// Components
import Date from "../Other/Date";

export default function Item({ conversation, data }) {
  return (
    <Link className="w-full" href={`Message/Conversation/${conversation.id}`}>
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
  );
}

// Components
import Receiver from "@/app/src/components/Message/Receiver";
import Sender from "@/app/src/components/Message/Sender";
import Button from "@/app/src/components/UI/Button/Button";
import Title from "@/app/src/components/UI/Title/Title";
import Picture from "@/app/src/components/UI/User/Picture";

// Features
import { getMessages, init } from "@/app/src/features/user";

export default async function Page({ params }) {
  const { data, message, status } = await getMessages(params.id);
  const user = await init();

  const sender = {
    name:
      data[0].conversation.participant1.name !== user.data.name
        ? data[0].conversation.participant1.name
        : data[0].conversation.participant2.name,
    picture:
      data[0].conversation.participant1.picture !== user.data.picture
        ? data[0].conversation.participant1.picture
        : data[0].conversation.participant2.picture,
  };

  return (
    <div className="w-full flex flex-col">
      <div className="rounded-t-lg dark:bg-night-300 p-4 flex flex-row gap-4 items-center">
        <Picture
          url={sender.picture}
          style={"h-14 w-14 rounded-full object-cover"}
        />
        <Title>{sender.name}</Title>
      </div>
      <div className="dark:bg-night-200 p-4 flex-1 overflow-y-scroll flex flex-col gap-2">
        {data.map((item) =>
          item.senderId === user.data.id ? (
            <Receiver data={item} />
          ) : (
            <Sender data={item} />
          )
        )}
      </div>
      <div className="dark:bg-night-300 p-4 flex flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Write your message here.."
          className="dark:bg-night-200 rounded-lg p-2 flex-1"
        />
        <Button>Send</Button>
      </div>
    </div>
  );
}

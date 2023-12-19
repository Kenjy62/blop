// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import ChatArea from "@/app/src/components/Message/Chat/ChatArea";
import ChatContainer from "@/app/src/components/Message/Chat/ChatContainer";
import ChatList from "@/app/src/components/Message/Chat/ChatList";
import ChatTop from "@/app/src/components/Message/Chat/ChatTop";

// Features
import {
  getMessages,
  init,
  setConversationRead,
} from "@/app/src/features/user";

export default async function Page({ params }) {
  const { data, message, status } = await getMessages(params.id);

  if (status === 200) {
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

    await setConversationRead(params.id);

    return (
      <ChatContainer>
        <ChatTop picture={sender.picture} name={sender.name} />
        <ChatList data={data} userId={user.data.id} />
        <ChatArea conversationId={params.id} userId={user.data.id} />
      </ChatContainer>
    );
  }

  if (status === 400) {
    return <ComponentError message={message} />;
  }
}

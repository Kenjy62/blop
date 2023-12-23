// Components
import ComponentError from "@/app/src/components/UI/Error/ComponentError";
import Item from "@/app/src/components/Message/Conversation/Item";
import SearchBar from "@/app/src/components/Message/Searchbar";
import Button from "@/app/src/components/UI/Button/Button";
import Message from "@/app/src/components/UI/Globals/Message";

// Features
import { getConversations } from "@/app/src/features/user";
import { init } from "@/app/src/features/user";

// Required
import Link from "next/link";

export default async function Page({ searchParams }) {
  const { data, message, status } = await getConversations(searchParams);

  const user = await init();

  const sortedConversations = data.sort((a, b) => {
    if (
      a.messages &&
      a.messages.length > 0 &&
      b.messages &&
      b.messages.length > 0
    ) {
      const lastMessageA = a.messages[0].createdAt;
      const lastMessageB = b.messages[0].createdAt;

      return new Date(lastMessageB) - new Date(lastMessageA);
    }

    if (a.messages && a.messages.length > 0) {
      return -1;
    } else if (b.messages && b.messages.length > 0) {
      return 1;
    }

    return 0;
  });

  if (status === 200 && data.length > 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <SearchBar />
          <Link href="/Message/Create">
            <Button>Open</Button>
          </Link>
        </div>
        {sortedConversations.map((item, id) => (
          <Item key={id} conversation={item} data={user.data} />
        ))}
      </div>
    );
  }

  if (status === 200 && data.length < 1 && searchParams?.query) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <SearchBar />
          <Link href="/Message/Create">
            <Button>Open</Button>
          </Link>
        </div>
        <Message>Unknow result with : {searchParams.query}</Message>
      </div>
    );
  }

  if (status === 200 && data.length < 1) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <SearchBar />
          <Link href="/Message/Create">
            <Button>Open</Button>
          </Link>
        </div>
        <Message>No Conversations for this moment!</Message>
      </div>
    );
  }

  if (status === 400) {
    return <ComponentError message={message} />;
  }
}

import Conversation from "@/app/src/components/Message/Conversation";
import SearchBar from "@/app/src/components/Message/Searchbar";
import Button from "@/app/src/components/UI/Button/Button";
import { getConversations } from "@/app/src/features/user";
import Link from "next/link";

export default async function Page({ searchParams }) {
  const { data, message, status } = await getConversations(searchParams);

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

    // Si l'une des conversations n'a pas de messages, elle sera placée à la fin.
    if (a.messages && a.messages.length > 0) {
      return -1;
    } else if (b.messages && b.messages.length > 0) {
      return 1;
    }

    return 0; // Les deux conversations n'ont pas de messages, l'ordre initial est conservé.
  });

  if (status === 200 && data.length > 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <SearchBar />
          <Link href="/Message/Create">
            <Button>Create Conversation</Button>
          </Link>
        </div>
        {sortedConversations.map((item) => (
          <Conversation conversation={item} />
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
            <Button>Create Conversation</Button>
          </Link>
        </div>
        <div>Unknow result with : {searchParams.query}</div>
      </div>
    );
  }

  if (status === 200 && data.length < 1) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <SearchBar />
          <Link href="/Message/Create">
            <Button>Create Conversation</Button>
          </Link>
        </div>
        <div className="flex justify-center">
          No Conversations for this moment
        </div>
      </div>
    );
  }

  if (status === 400) {
    return <p>error</p>;
  }
}

import Conversation from "@/app/src/components/Message/Conversation";
import SearchBar from "@/app/src/components/Message/Searchbar";
import Button from "@/app/src/components/UI/Button/Button";
import { getConversations } from "@/app/src/features/user";

export default async function Page({ searchParams }) {
  const { data, message, status } = await getConversations(searchParams);

  if (status === 200 && data.length > 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <SearchBar />
          <Button>Create Conversation</Button>
        </div>
        {data.map((item) => (
          <Conversation conversation={item} />
        ))}
      </div>
    );
  }

  if (status === 200 && data.length < 1) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-4">
          <SearchBar />
          <Button>Create Conversation</Button>
        </div>
        <div>Unknow result with : {searchParams.query}</div>
      </div>
    );
  }

  if (status === 400) {
    return <p>error</p>;
  }
}

// Components
import Title from "../../Title/Title";
import ComponentError from "../../../Error/ComponentError";
import UserCard from "../../Cards/UserCard";

// Features
import { GetLastUsers } from "@/app/src/features/sidebar/lastusers";

export default async function LastUsers() {
  const { data, message, status } = await GetLastUsers();

  if (status === 400) {
    return <ComponentError message={message} />;
  }

  if (status === 200) {
    return (
      <div className="flex flex-col gap-3">
        <Title>Last Users</Title>
        <div className="border dark:border-night-200 rounded-lg p-4 flex flex-col flex-wrap gap-4">
          {data.length > 0 &&
            data.map((user) => {
              return <UserCard key={user.id} user={user} />;
            })}
          {data.length < 1 && <p>No new user for this moment</p>}
        </div>
      </div>
    );
  }
}

// Components
import ComponentError from "@/app/src/components/Error/ComponentError";
import Modal from "@/app/src/components/Message/Modal";

// Features
import { getFollower, init } from "@/app/src/features/user";

export default async function Page() {
  const { data, message, status } = await getFollower();
  const user = await init();

  if (status === 200) {
    return (
      <Modal
        userFollowed={data}
        defaultTheme={user.data.darkMode ? user.data.darkMode : ""}
      />
    );
  }

  if (status === 400) {
    return <ComponentError message={message} />;
  }
}

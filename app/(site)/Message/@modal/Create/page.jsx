import Modal from "@/app/src/components/Message/Modal";
import { getFollower } from "@/app/src/features/user";

export default async function Page() {
  const { data, message, status } = await getFollower();

  if (status === 200) {
    return <Modal userFollowed={data} />;
  }

  if (status === 400) {
    return <p>error</p>;
  }
}

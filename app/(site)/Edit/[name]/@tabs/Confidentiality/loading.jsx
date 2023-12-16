// Components
import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center w-full">
      <SyncLoader color="white" />
    </div>
  );
}

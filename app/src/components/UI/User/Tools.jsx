// Components
import Messages from "./Tools/Messages";
import Notifications from "./Tools/Notifications";

export default function Tools(){
    return (
        <div className="flex flex-row-reverse gap-4">
            <Notifications />
            <Messages />
        </div>
    )
}
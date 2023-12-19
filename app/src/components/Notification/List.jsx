// Components
import Message from "../UI/Globals/Message";
import Item from "./Item";
import LoadMore from "./LoadMore";

export default function List({ list, tab }) {
  return (
    <div className="flex flex-col gap-4">
      {list.length > 0 &&
        list.map((item, id) => {
          return <Item item={item} key={id} />;
        })}
      {list.length > 0 && <LoadMore tab={tab} />}
      {list.length < 1 && <Message>No notifications for this moment!</Message>}
    </div>
  );
}

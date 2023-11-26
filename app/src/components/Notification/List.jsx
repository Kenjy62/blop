// Components

import Item from "./Item";

export default function List({ list }) {
  return (
    <div className="flex flex-col gap-4">
      {list.length > 0 &&
        list.map((item, id) => {
          return <Item item={item} key={id} />;
        })}
      {list.length < 1 && (
        <div className="flex justify-center w-full">
          <p>No notifications for this moment.</p>
        </div>
      )}
    </div>
  );
}

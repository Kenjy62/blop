// Required
import Image from "next/image";

// Components
import Tag from "../UI/Tag/Tag";
import Picture from "../UI/User/Picture";

// Features
import { setIsRead } from "../../features/notification";

export default function List({ list }) {
  const onHover = async (id) => {
    await setIsRead(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {list.length > 0 &&
        list.map((item) => {
          return (
            <div
              onMouseEnter={() => item.isRead === 0 && onHover(item.id)}
              key={item.id}
              className="flex flex-row gap-2 p-4 items-center cursor-pointer dark:bg-night-400 hover:dark:bg-night-200 hover:bg-watermelon-100 hover:rounded-lg border-b dark:border-night-200"
            >
              <Picture
                url={item.author.picture}
                name={item.author.name}
                link={true}
                style="rounded-full h-10 w-10 cursor-pointer object-cover"
              />
              <span className="w-fit">
                {item.author.name} has {item.type} your post : date
              </span>
              {item.isRead === 0 && (
                <div className="flex flex-1 justify-end align-top">
                  <Tag state={"Active"}>New</Tag>
                </div>
              )}
            </div>
          );
        })}
      {list.length < 1 && (
        <div className="flex justify-center w-full">
          <p>No notifications for this moment.</p>
        </div>
      )}
    </div>
  );
}

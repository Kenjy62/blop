// Required
import Image from "next/image";

export default function List({ list }) {
  return (
    <div className="flex flex-col gap-4">
      {list.length > 0 &&
        list.map((item) => {
          return (
            <div className="flex flex-row gap-2 p-4 items-center cursor-pointer hover:bg-watermelon-100 hover:rounded-lg border-b">
              <Image
                className="rounded-full h-10 w-10"
                src={item.author.picture}
                height={64}
                width={64}
              />
              <span className="w-fit">
                {item.author.name} has {item.type} your post : date
              </span>
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

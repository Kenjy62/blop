// Components
import Picture from "../../../UI/User/Picture";

// Icons
import { RxClock } from "react-icons/rx";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Comment({ comment }) {
  return (
    <>
      <div className="w-full p-4 border rounded-lg flex flex-row gap-4 hover:border-watermelon-200">
        <div className="h-fit">
          <Picture
            url={comment.author.picture}
            name={comment.author.name}
            link={true}
            style="h-14 w-14 rounded-full cursor-pointer object-cover"
          />
        </div>
        <div className="flex flex-col w-full gap-6">
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <span className="font-medium">{comment.author.name}</span>
              <span className="font-light text-xs flex flex-row items-center gap-1">
                <RxClock /> {dayjs(comment.createdAt).fromNow()}
              </span>
            </div>
            <div className="font-normal">{comment.content}</div>
          </div>
        </div>
      </div>
    </>
  );
}

// Icons
import { RxClock } from "react-icons/rx";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Date({ date }) {
  return (
    <span className="font-light text-xs flex flex-row items-center gap-1">
      <RxClock /> {dayjs(date).fromNow()}{" "}
    </span>
  );
}

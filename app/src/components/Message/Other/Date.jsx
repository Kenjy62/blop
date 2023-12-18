"use client";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Icons
import { RxClock } from "react-icons/rx";

export default function Date({ date }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <RxClock /> {dayjs(date).fromNow()}
    </div>
  );
}

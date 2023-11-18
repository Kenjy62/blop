// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Receiver({ data }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-end">
        <div className="dark:bg-night-300 rounded-lg p-2">{data.content}</div>
      </div>
      <div className="flex flex-row justify-end">
        <span className="text-xs">{dayjs(data.createdAt).fromNow()}</span>
      </div>
    </div>
  );
}

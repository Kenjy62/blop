// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Sender({ data }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-start">
        <div className="dark:bg-night-300 rounded-lg p-2">{data.content}</div>
      </div>
      <div className="flex flex-row justify-start">
        <span className="text-xs">{dayjs(data.createdAt).fromNow()}</span>
      </div>
    </div>
  );
}

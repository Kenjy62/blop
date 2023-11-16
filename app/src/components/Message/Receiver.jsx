export default function Receiver({ data }) {
  return (
    <div className="flex flex-row justify-end">
      <div className="dark:bg-night-300 rounded-lg p-2">{data.content}</div>
    </div>
  );
}

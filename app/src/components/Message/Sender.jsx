export default function Sender({ data }) {
  return (
    <div className="flex flex-row justify-start">
      <div className="dark:bg-night-400 w-fit rounded-lg p-2">
        {data.content}
      </div>
    </div>
  );
}

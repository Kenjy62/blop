export default function ChatContainer({ children }) {
  return (
    <div className="h-full w-full flex flex-col border dark:border-night-200 rounded-lg">
      {children}
    </div>
  );
}

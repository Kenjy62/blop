export default function Tag({ children, state }) {
  return (
    <div
      className={`${
        state === "Active"
          ? "bg-watermelon-400 dark:bg-night-300"
          : "bg-gray-300 dark:bg-night-400"
      } rounded-lg px-3 py-1 text-white cursor-pointer`}
    >
      {children}
    </div>
  );
}

export default function Tag({ children, state }) {
  return (
    <div
      className={`${
        state === "Active" ? "bg-watermelon-400" : "bg-gray-300"
      } rounded-lg px-3 py-1 text-white cursor-pointer`}
    >
      {children}
    </div>
  );
}

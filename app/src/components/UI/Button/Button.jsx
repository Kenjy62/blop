export default function Button({ children }) {
  return (
    <div className="py-1 px-3 h-fit bg-watermelon-400 text-white rounded-lg w-fit hover:bg-watermelon-500 cursor-pointer">
      {children}
    </div>
  );
}

export default function AlertBox({ message }) {
  return (
    <div className="w-full p-4 bg-red-300 text-red-500 font-medium border-2 border-red-400 rounded-lg">
      {message}
    </div>
  );
}

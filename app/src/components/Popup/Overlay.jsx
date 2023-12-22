export default function Overlay({ children }) {
  return (
    <div className="fixed top-0 h-screen w-full bg-[#00000085] z-40 overflow-hidden p-8 flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}

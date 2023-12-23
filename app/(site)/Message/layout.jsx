export default function Layout({ children, modal }) {
  return (
    <div className="w-full py-4 px-4">
      {children}
      {modal}
    </div>
  );
}

export default function Layout({ children, modal }) {
  return (
    <div className="w-full">
      {children}
      {modal}
    </div>
  );
}

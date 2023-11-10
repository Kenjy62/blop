export const Success = function ({ children }) {
  return <p>{children}</p>;
};

export const Error = function ({ children }) {
  return (
    <div className="bg-watermelon-400 border border-watermelon-500 text-white p-2 rounded-lg text-sm">
      {children}
    </div>
  );
};

const MessageBox = ({ message, type = "error" }) => {
  const styles =
    type === "error"
      ? "border bg-red-50 border-red-300 text-gray-600"
      : "border bg-green-50 border-green-300 text-gray-600";

  return (
    <p
      className={`my-4 text-center py-3 rounded-lg text-base font-medium ${styles}`}
    >
      {message}
    </p>
  );
};

export default MessageBox;

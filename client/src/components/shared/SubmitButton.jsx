const SubmitButton = ({ loading, children }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full text-white py-3 rounded-lg text-lg font-medium cursor-pointer transition duration 300 ${
        loading
          ? "bg-blue-300 cursor-not-allowed text-white"
          : "bg-blue-600 hover:bg-blue-500 text-white active:bg-blue-600"
      }`}
    >
      {loading ? "Logging in..." : children}
    </button>
  );
};

export default SubmitButton;

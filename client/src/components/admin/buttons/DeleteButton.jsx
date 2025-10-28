import { Trash2 } from "lucide-react";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-md gap-1 w-[auto] bg-red-500 text-white px-3 py-1 hover:bg-red-600 active:scale-95 transition-transform duration-200 cursor-pointer"
    >
      <Trash2 size={15} />
      <span className="truncate">Delete</span>
    </button>
  );
}

export default DeleteButton;
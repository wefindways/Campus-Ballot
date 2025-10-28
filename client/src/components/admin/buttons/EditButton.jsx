import { Edit } from "lucide-react";

const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-md gap-1 w-[auto] bg-green-500 text-white px-3 py-1 hover:bg-green-600 active:scale-95 transition-transform duration-200 cursor-pointer"
    >
      <Edit size={15} />
      <span className="truncate">Edit</span>
    </button>
  );
};

export default EditButton;

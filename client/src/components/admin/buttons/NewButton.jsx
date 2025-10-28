import { Plus } from "lucide-react";

const NewButton = ({ onAdd }) => {
  return (
    <button
      onClick={onAdd}
      className="w-full text-sm md:text-base inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-transform duration-200 cursor-pointer"
    >
      <Plus size={16} />
      <span className="truncate">New</span>
    </button>
  );
};

export default NewButton;

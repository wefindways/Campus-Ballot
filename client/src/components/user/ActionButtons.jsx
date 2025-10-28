import { Eye, Save } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-full justify-center gap-5 p-6">
      <button className="flex items-center gap-2 bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer">
        <Eye size={18} />
        Preview
      </button>

      <button className="flex items-center gap-2 bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600 transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer">
        <Save size={18} />
        Submit
      </button>
    </div>
  );
}

export default ActionButtons;

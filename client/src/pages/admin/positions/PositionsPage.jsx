// PositionsPage.jsx
import Modal from "../../../components/shared/Modal";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import PositionsTable from "./PositionsTable";
import { usePositions } from "../../../hooks/admin/positions";
import MessageBox from "../../../components/shared/MessageBox";
import { Save } from "lucide-react";

const Positions = () => {
  const {
    positions,
    showModal,
    modalMode,
    description,
    setDescription,
    maxVote,
    setMaxVote,
    openModal,
    message,
    closeModal,
    savePosition,
    deletePosition,
  } = usePositions();

  return (
    <div className="grid grid-rows-[auto_auto] gap-5">
      <header className="flex justify-between items-center">
        <h1 className="text-[1.37rem] md:text-3xl font-bold">Positions</h1>
        <Breadcrumb />
      </header>

      <div className="overflow-x-auto bg-white p-4 rounded border-t-4 border-gray-300 shadow-md">
        {/* Positions Table */}
        <PositionsTable
          positions={positions}
          onEdit={(pos) => openModal("edit", pos)}
          onDelete={deletePosition}
          onAdd={() => openModal("add")}
        />

        {/* Modal */}
        {showModal && (
          <Modal
            title={modalMode === "add" ? "Add New Position" : "Edit Position"}
            onClose={closeModal}
          >
            <form onSubmit={savePosition} className="space-y-6">
              {/* Position Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition-all duration-200"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Max Vote Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Vote
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 
                  focus:ring-2 focus:outline-none focus:ring-blue-400 
                   transition-all duration-200"
                  value={maxVote}
                  min={0}
                  onChange={(e) => setMaxVote(Number(e.target.value))}
                  required
                />
              </div>

              {/* Message */}
              {message && <MessageBox message={message} />}

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 
                   text-gray-700 font-medium hover:bg-gray-200 active:bg-gray-100
                   transition-colors duration-200 shadow-sm cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 
                   text-white font-medium shadow-md 
                   hover:bg-blue-700 active:bg-blue-500
                   transition-transform duration-200 cursor-pointer"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Positions;

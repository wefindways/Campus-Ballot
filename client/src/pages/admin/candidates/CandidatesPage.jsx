import CandidatesTable from "./CandidatesTable";
import Modal from "../../../components/shared/Modal";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import { useCandidates } from "../../../hooks/admin/candidates";
import MessageBox from "../../../components/shared/MessageBox";
import { Save } from "lucide-react";

const Candidates = () => {
  const {
    candidates,
    positions,
    showModal,
    modalMode,
    position,
    setPosition,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    photo,
    setPhoto,
    platform,
    setPlatform,
    closeModal,
    openModal,
    message,
    saveCandidate,
    deleteCandidate,
  } = useCandidates();

  return (
    <div className="grid grid-rows-[auto_auto] gap-5">
      <header className="flex justify-between items-center">
        <h1 className="text-[1.37rem] md:text-3xl font-bold">Candidates</h1>
        <Breadcrumb />
      </header>

      <div className="overflow-x-auto bg-white p-4 rounded border-t-4 border-gray-300 shadow-md">
        {/* Candidates table here */}
        <CandidatesTable
          candidates={candidates}
          positions={positions}
          onEdit={(c) => openModal("edit", c)}
          onDelete={deleteCandidate}
          onAdd={() => openModal("add")}
        />

        {/* Modal */}
        {showModal && (
          <Modal
            title={modalMode === "add" ? "Add New Position" : "Edit Position"}
            onClose={closeModal}
          >
            <form onSubmit={saveCandidate} className="space-y-4">
              {/* Fistname Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firstname
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition-all duration-200"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              {/* Lastname field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lastname
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition-all duration-200"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              {/* Position field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition-all duration-200"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                >
                  <option value="">- Select -</option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition-all duration-200"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  accept="image/*"
                />
              </div>

              {/* Platform field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <textarea
                  value={platform}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
                   transition-all duration-200"
                  rows={3}
                  onChange={(e) => setPlatform(e.target.value)}
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
                   text-gray-700 font-medium hover:bg-gray-200 
                   transition-colors duration-200 shadow-sm cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 
                   text-white font-medium shadow-md 
                   hover:bg-blue-700 active:scale-95 
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

export default Candidates;

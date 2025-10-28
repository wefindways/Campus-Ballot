import { useState } from "react";
import usePositionCandidates from "../../hooks/admin/usePositionCandidates";
import { Search } from "lucide-react";
import Modal from "../shared/Modal";
import { usePositions } from "../../hooks/admin/positions";

const VotingCard = () => {
  const { positionsWithCandidates } = usePositionCandidates();
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const { showModal, openModal, closeModal } = usePositions();

  const handleSelectionChange = (positionId, candidateId, maxVote) => {
    setSelectedCandidates((prev) => {
      const current = prev[positionId] || [];

      if (maxVote > 1) {
        if (current.includes(candidateId)) {
          return {
            ...prev,
            [positionId]: current.filter((id) => id !== candidateId),
          };
        } else if (current.length < maxVote) {
          return {
            ...prev,
            [positionId]: [...current, candidateId],
          };
        } else {
          return prev;
        }
      }

      return {
        ...prev,
        [positionId]: [candidateId],
      };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
      {positionsWithCandidates.map((position) => (
        <div
          key={position.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {position.description}
            </h2>
            <p className="text-sm text-gray-500">
              {position.max_vote > 1
                ? `Select ${position.max_vote} candidates`
                : `Select only ${position.max_vote} candidate`}
            </p>
          </div>

          {position.candidates.length > 0 ? (
            position.candidates.map((cand) => (
              <div className="m-4" key={cand.id}>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type={position.max_vote > 1 ? "checkbox" : "radio"}
                      value={cand.id}
                      checked={(selectedCandidates[position.id] || []).includes(
                        cand.id
                      )}
                      onChange={() =>
                        handleSelectionChange(
                          position.id,
                          cand.id,
                          position.max_vote
                        )
                      }
                      className="cursor-pointer accent-blue-600"
                    />

                    <span className="text-gray-800 font-medium">
                      {cand.firstname} {cand.lastname}
                    </span>
                  </label>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        setSelectedCandidates(cand);
                        openModal();
                      }}
                      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 active:bg-blue-500 transition-all duration-200 cursor-pointer"
                    >
                      <Search size={16} className="inline-block align-middle" />
                      <span className="leading-none">Platform</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="p-5 text-gray-400 text-sm italic">
              No candidates yet.
            </p>
          )}
        </div>
      ))}

      {showModal && selectedCandidates && (
        <Modal title={`${selectedCandidates.firstname}'s Platform`} onClose={closeModal}>
          <div className="flex flex-col gap-5">
            <div>
              <img
                src="https://th.bing.com/th/id/R.e62e5de7cb28296c426e03a69120aca9?rik=dnH20IjXHBi1WA&riu=http%3a%2f%2fprofiles.ph%2fwp-content%2fuploads%2f2021%2f03%2fDaniel-Padilla.jpg&ehk=Jr3esQ5fG8TtspO62nVQ3aBLtP%2fCtzfwUQI51elXSGs%3d&risl=&pid=ImgRaw&r=0"
                alt="Deej"
                className="w-full max-h-72 object-cover rounded-xl shadow"
              />
            </div>
            <div className="text-center text-base">
              {selectedCandidates.platform ? (
                <p className="font-semibold">"{selectedCandidates.platform}"</p>
              ) : (
                <p className="italic text-gray-700">No Platform</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 
                   text-gray-700 font-medium hover:bg-gray-200 active:bg-gray-100
                   transition-colors duration-200 shadow-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VotingCard;

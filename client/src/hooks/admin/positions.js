// Contains CRUD logic in one place (Create, Read, Update, Delete).
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  "http://localhost/online-voting-system/project/server/api/auth/admin/positions.php";

export function usePositions() {
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [description, setDescription] = useState("");
  const [maxVote, setMaxVote] = useState(0);
  const [message, setMessage] = useState(false);

  // Fetch positions from server
  const fetchPositions = async () => {
    try {
      const res = await axios.get(API_URL);
      setPositions(res.data);
    } catch (err) {
      setMessage(res.data.message);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  // Open modal in either mode
  const openModal = (mode = "add", position = null) => {
    setModalMode(mode);
    if (mode === "edit" && position) {
      setEditingId(position.id);
      setDescription(position.description);
      setMaxVote(position.max_vote);
      setMessage(false);
    } else {
      setEditingId(null);
      setDescription("");
      setMaxVote(0);
      setMessage(false);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode("add");
    setEditingId(null);
    setDescription("");
    setMaxVote(0);
  };

  // Save (add or edit)
  const savePosition = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === "add") {
        // --- ADD NEW ---
        const res = await axios.post(API_URL, {
          description,
          max_vote: Number(maxVote), 
        });

        if (res.data.success) {
          setPositions((prev) => [res.data.position, ...prev]);
          closeModal();
        } else {
          setMessage(res.data.message);
        }
      } else {
        // --- UPDATE EXISTING ---
        const res = await axios.put(`${API_URL}?id=${editingId}`, {
          id: editingId, // send id
          description,
          max_vote: Number(maxVote),
        });

        if (res.data.success) {
          // update state directly (no need to refetch unless you want fresh DB data)
          setPositions((prev) =>
            prev.map((pos) =>
              pos.id === editingId
                ? { ...pos, description, max_vote: Number(maxVote) }
                : pos
            )
          );
          closeModal();
        } else {
          setMessage(res.data.message);
        }
      }
    } catch (err) {
      setMessage(res.data.message);
    }
  };

  // Delete position
  const deletePosition = async (id) => {
    try {
      const res = await axios.delete(API_URL, { data: { id } });

      if (res.data.success) {
        setPositions((prev) => prev.filter((pos) => pos.id !== id));
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("⚠️ Failed to delete position");
    }
  };

  return {
    positions,
    showModal,
    modalMode,
    description,
    setDescription,
    maxVote,
    setMaxVote,
    message,
    setMessage,
    openModal,
    closeModal,
    savePosition,
    deletePosition,
  };
}

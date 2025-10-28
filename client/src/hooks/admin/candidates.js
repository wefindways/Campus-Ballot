import axios from "axios";
import { useEffect, useState } from "react";

const API_CANDIDATES =
  "http://localhost/online-voting-system/project/server/api/auth/admin/candidates.php";

const API_POSITIONS =
  "http://localhost/online-voting-system/project/server/api/auth/admin/positions.php";

export function useCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState(null);
  const [platform, setPlatform] = useState("");

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(API_CANDIDATES);
      setCandidates(res.data);
    } catch (err) {
      setMessage(res.data.message);
    }
  };

  const fetchPositions = async () => {
    try {
      const res = await axios.get(API_POSITIONS);
      setPositions(res.data);
    } catch (err) {
      setMessage(res.data.message);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchPositions();
  }, []);

  const openModal = (mode = "add", candidate = null) => {
    setModalMode(mode);
    if (mode === "edit" && candidate) {
      setEditingId(candidate.id);
      setFirstName(candidate.firstname);
      setLastName(candidate.lastname);
      setPosition(candidate.position_id);
      setPhoto(null); // don’t prefill photo, only new uploads
      setPlatform(candidate.platform);
      setMessage(false);
    } else {
      setEditingId(null);
      setFirstName("");
      setLastName("");
      setPosition("");
      setPhoto(null);
      setPlatform("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode("add");
    setFirstName("");
    setLastName("");
    setPosition("");
    setPhoto(null);
    setPlatform("");
  };

  const saveCandidate = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === "add") {
        const formData = new FormData();
        formData.append("firstname", firstName);
        formData.append("lastname", lastName);
        formData.append("position_id", position);
        formData.append("platform", platform);
        formData.append("photo", photo); // <-- must match $_FILES['photo']

        const res = await axios.post(API_CANDIDATES, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          fetchCandidates();
          closeModal();
        } else {
          setMessage(res.data.message);
        }
      } else {
        const res = await axios.put(API_CANDIDATES, {
          id: editingId,
          firstname: firstName,
          lastname: lastName,
          position_id: position,
          platform,
          // photo update would need multipart handling separately
        });

        if (res.data.success) {
          setCandidates((prev) =>
            prev.map((c) =>
              c.id === editingId
                ? {
                    ...c,
                    firstname: firstName,
                    lastname: lastName,
                    position_id: position,
                    platform,
                  }
                : c
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

  // Delete candidates
  const deleteCandidate = async (id) => {
    try {
      const res = await axios.delete(API_CANDIDATES, { data: { id } });

      if (res.data.success) {
        setCandidates((c) => c.filter((c) => c.id !== id));
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("⚠️ Failed to delete position");
    }
  };

  return {
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
    setMessage,
    saveCandidate,
    deleteCandidate,
  };
}

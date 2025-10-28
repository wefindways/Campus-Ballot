import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useRegistration() {
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    department: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost/online-voting-system/project/server/api/auth/user/register.php",
        formData
      );

      if (res.data.success) {
        setLoading(true);
        setMessage(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage("⚠️ " + res.data.message);
        setLoading(false);
      }
    } catch (error) {
      setMessage("⚠️ Server error, please try again later.");
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    message,
    loading,
  };
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost/online-voting-system/project/server/api/auth/user/login.php",
        {
          student_id: studentId,
          password: password,
        }
      );

      if (res.data.success) {
        setLoading(true);
        setMessage(false);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setLoading(false);
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  return {
    studentId,
    password,
    setStudentId,
    setPassword,
    message,
    loading,
    handleLogin,
  };
}

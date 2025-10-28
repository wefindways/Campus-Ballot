import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useAdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost/online-voting-system/project/server/api/auth/admin/admin_login.php",
        { username, password }
      );

      if (res.data.success) {
        localStorage.setItem("isAdmin", true);
        localStorage.setItem("admin_id", res.data.admin_id);
        setLoading(true);
        setMessage(false);
        setTimeout(() => {
          navigate("/admin/home");
        }, 2000);
      } else {
        setLoading(false);
        setMessage("⚠️ " + res.data.message);
      }
    } catch (error) {
      setMessage("⚠️ Server error, please try again later.");
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    message,
    loading,
    handleLogin,
  };
}

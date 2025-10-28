import { useAdminLogin } from "../../../hooks/admin/useAdminLogin";
import FormInput from "../../../components/shared/FormInput";
import MessageBox from "../../../components/shared/MessageBox";
import SubmitButton from "../../../components/shared/SubmitButton";
import Footer from "../../../components/shared/Footer";

const AdminLogin = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    message,
    loading,
    handleLogin,
  } = useAdminLogin();

  return (
    <div className="flex justify-center items-center overflow-hidden min-h-screen">
      <div className="w-full max-w-xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Admin Login
          </h1>
          <p className="text-gray-500 text-base md:text-lg mt-2">
            Please sign in to start your session
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <FormInput
            label="Username"
            type="text"
            id="admin_username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <FormInput
            label="Password"
            type="password"
            id="admin_password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error Message */}
          {message && <MessageBox message={message} />}

          {/* Submit Button */}
          <SubmitButton loading={loading}>Login</SubmitButton>
        </form>

        {/* Footer */}
        <footer className="mt-8">
          <Footer variant="help" />
        </footer>
      </div>
    </div>
  );
};

export default AdminLogin;

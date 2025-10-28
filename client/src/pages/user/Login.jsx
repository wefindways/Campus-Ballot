import { useLogin } from "../../hooks/user/useLogin";
import { Link } from "react-router-dom";
import FormInput from "../../components/shared/FormInput";
import MessageBox from "../../components/shared/MessageBox";
import SubmitButton from "../../components/shared/SubmitButton";
import Footer from "../../components/shared/Footer";

const Login = () => {
  const {
    studentId,
    password,
    setStudentId,
    setPassword,
    message,
    loading,
    handleLogin,
  } = useLogin();

  return (
    <div className="flex justify-center items-center overflow-hidden min-h-screen">
      <div className="w-full max-w-xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome back
          </h1>
          <p className="text-gray-500 text-base md:text-lg mt-2">
            Please enter your credentials below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <FormInput
            label="School ID"
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="e.g. 2025-005"
            required
          />

          <FormInput
            label="Password"
            type="password"
            id="password"
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

        {/* Account center */}
        <p className="text-center my-5 text-gray-700 text-sm md:text-base">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </p>

        {/* Footer */}
        <footer className="mt-8">
          <Footer variant="help" />
        </footer>
      </div>
    </div>
  );
};

export default Login;

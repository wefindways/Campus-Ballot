import { useRegistration } from "../../hooks/user/useRegistration";
import { Link } from "react-router-dom";
import Footer from "../../components/shared/Footer";
import SubmitButton from "../../components/shared/SubmitButton";
import MessageBox from "../../components/shared/MessageBox";
import FormInput from "../../components/shared/FormInput";

const Registration = () => {
  const { formData, handleChange, handleSubmit, message, loading } =
    useRegistration();

  return (
    <div className="flex justify-center items-center overflow-hidden min-h-screen">
      <div className="w-full max-w-xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Create your account
          </h1>
          <p className="text-gray-500 text-base md:text-lg mt-2">
            Please fill in your information below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="School ID"
            type="text"
            name="student_id"
            placeholder="e.g. 2025-005"
            value={formData.student_id}
            onChange={handleChange}
            required
            extraInfo="Enter the student ID assigned by the school"
          />

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <FormInput
                label="First Name"
                type="text"
                name="first_name"
                placeholder="Juan"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <FormInput
                label="Last Name"
                type="text"
                name="last_name"
                placeholder="Dela Cruz"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <FormInput
            label="Department"
            name="department"
            type="text"
            placeholder="e.g. BSIT"
            value={formData.department}
            onChange={handleChange}
            required
            extraInfo="No year level needed"
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Message */}
          {message && <MessageBox message={message} />}

          <SubmitButton loading={loading}>Register</SubmitButton>
        </form>

        <p className="text-center my-5 text-gray-700 text-sm md:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>

        {/* Footer note */}
        <footer className="mt-8">
          <Footer variant="note" />
        </footer>
      </div>
    </div>
  );
};

export default Registration;

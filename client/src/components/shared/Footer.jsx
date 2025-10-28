import { formatDate } from "../../utils/formatDate";

const Footer = ({ variant = "copyright" }) => {
  if (variant === "copyright") {
    return (
      <div className="bg-gray-200 py-6">
        <p className="text-xs md:text-sm text-center text-gray-600">
          &copy; {formatDate()} Team CampusBallot. All rights reserved.
        </p>
      </div>
    );
  }

  return (
    <p className="mt-6 text-sm text-gray-500 text-center">
      Need help? Contact the IT office — it@school.edu.ph
    </p>
  );
};

export default Footer;

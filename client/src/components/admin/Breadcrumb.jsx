import { PieChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // If the path is just /admin/home, show only "Home". Otherwise show Home › LastSegment
  const lastSegment = pathnames[pathnames.length - 1];

  return (
    <nav className="text-xs sm:text-sm flex items-center">
      <Link to="/admin/home">
        <div className="flex items-center gap-2 text-gray-700 hover:text-blue-700">
          <PieChart className="w-4 h-4 md:w-6 md:h-6" />
          <span>Home</span>
        </div>
      </Link>
      <span className="mx-2">›</span>
      <span className="text-gray-400 capitalize">
        {`${pathnames.length <= 2 ? "Dashboard" : lastSegment}`}
      </span>
    </nav>
  );
};

export default Breadcrumb;

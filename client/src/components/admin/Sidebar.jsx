import {
  PieChart,
  Vote,
  UserCheck,
  Medal,
  Users,
  FileStack,
  Briefcase,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <section>
      {/* Reports section */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } px-6 py-4 border-b border-b-gray-100`}
      >
        <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase">
          Reports
        </p>
      </div>

      {/* Navigation */}
      <div
        className={`${
          isOpen
            ? "flex flex-col px-4 py-2 space-y-2"
            : "flex flex-col px-4 pb-2 pt-5 space-y-2"
        }`}
      >
        <NavLink
          title="Dashboard"
          to="/admin/home"
          end
          className={({ isActive }) =>
            `sidebar-nav ${isActive ? "bg-blue-100" : ""}`
          }
        >
          <div className="flex gap-3">
            <PieChart />
            <span className={`${isOpen ? "block" : "hidden"} truncate`}>
              Dashboard
            </span>
          </div>
        </NavLink>
        <NavLink
          title="Votes"
          to="/admin/home/votes"
          className={({ isActive }) =>
            `sidebar-nav ${isActive ? "bg-blue-100" : ""}`
          }
        >
          <div className="flex gap-3">
            <Vote />
            <span className={`${isOpen ? "block" : "hidden"} truncate`}>
              Votes
            </span>
          </div>
        </NavLink>
      </div>

      {/* Manage section */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } px-6 py-4 border-b border-b-gray-100`}
      >
        <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase">
          Manage
        </p>
      </div>

      {/* Navigation */}
      <div
        className={`${
          isOpen
            ? "flex flex-col px-4 py-2 space-y-2"
            : "flex flex-col px-4 pb-2 space-y-2"
        }`}
      >
        <NavLink
          title="Voters"
          to="/admin/home/voters"
          className={({ isActive }) =>
            `sidebar-nav ${isActive ? "bg-blue-100" : ""}`
          }
        >
          <div className="flex gap-3">
            <UserCheck />
            <span className={`${isOpen ? "block" : "hidden"} truncate`}>
              Voters
            </span>
          </div>
        </NavLink>
        <NavLink
          title="Positions"
          to="/admin/home/positions"
          className={({ isActive }) =>
            `sidebar-nav ${isActive ? "bg-blue-100" : ""}`
          }
        >
          <div className="flex gap-3">
            <Medal />
            <span className={`${isOpen ? "block" : "hidden"} truncate`}>
              Positions
            </span>
          </div>
        </NavLink>
        <NavLink
          title="Candidates"
          to="/admin/home/candidates"
          className={({ isActive }) =>
            `sidebar-nav ${isActive ? "bg-blue-100" : ""}`
          }
        >
          <div className="flex gap-3">
            <Users />
            <span className={`${isOpen ? "block" : "hidden"} truncate`}>
              Candidates
            </span>
          </div>
        </NavLink>
      </div>

      {/* Settings section*/}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } px-6 py-4 border-b border-b-gray-100`}
      >
        <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase">
          Settings
        </p>
      </div>

      {/* Navigation */}
      <div
        className={`${
          isOpen
            ? "flex flex-col px-4 py-2 space-y-2"
            : "flex flex-col px-4 space-y-2"
        }`}
      >
        <NavLink
          title="Ballot Position"
          to="/admin/home/ballot-position"
          className={({ isActive }) =>
            `sidebar-nav ${isActive ? "bg-blue-100" : ""}`
          }
        >
          <div className="flex gap-3">
            <FileStack />
            <span className={`${isOpen ? "block" : "hidden"} truncate`}>
              Ballot Position
            </span>
          </div>
        </NavLink>
        <NavLink
          title="Election Title"
          to="/admin/home/election-title"
          className={({ isActive }) =>
            `sidebar-nav ${isActive ? "bg-blue-100" : ""}`
          }
        >
          <div className="flex gap-3">
            <Briefcase />
            <span className={`${isOpen ? "block" : "hidden"} truncate`}>
              Election Title
            </span>
          </div>
        </NavLink>
      </div>
    </section>
  );
};

export default Sidebar;

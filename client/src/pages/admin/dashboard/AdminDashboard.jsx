import { AlignLeft, Edit, Users, User } from "lucide-react";
import Breadcrumb from "../../../components/admin/Breadcrumb";
import StatCard from "../../../components/admin/StatCard";
import VoteTally from "../../../components/admin/VoteTally";

const AdminDashboard = () => {
  return (
    <div className="grid grid-rows-[auto_auto] gap-15">
      <section className="flex flex-col gap-5">
        <header className="flex justify-between items-center">
          <h1 className="text-[1.37rem] md:text-3xl font-bold">Dashboard</h1>
          <Breadcrumb />
        </header>
        <div
          aria-label="Dashboard cards"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-gray-900"
        >
          <StatCard
            value="3"
            label="Voters Voted"
            icon={Edit}
            to="/admin/home/votes"
          />
          <StatCard
            value="10"
            label="No. of Positions"
            icon={AlignLeft}
            to="/admin/home/positions"
          />
          <StatCard
            value="25"
            label="No. of Candidates"
            icon={Users}
            to="/admin/home/candidates"
          />
          <StatCard
            value="100"
            label="Total Voters"
            icon={User}
            to="voters"
          />
        </div>
      </section>

      <section>
        <VoteTally />
      </section>
    </div>
  );
}

export default AdminDashboard;

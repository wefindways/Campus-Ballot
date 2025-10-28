import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const VoteTally = () => {
  const presidentData = [
    { name: "Marc Joseph Cruz", votes: 90 },
    { name: "Oliver Espeno", votes: 10 },
  ];

  const vicePresidentData = [{ name: "Jv Haveria", votes: 100 }];

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-[1.37rem] md:text-3xl font-bold">Vote Tally</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* President Chart */}
        <div className="w-full bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">President</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={presidentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vice President Chart */}
        <div className="w-full bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Vice President</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={vicePresidentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VoteTally;

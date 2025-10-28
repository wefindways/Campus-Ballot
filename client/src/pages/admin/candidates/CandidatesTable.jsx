import DataTable from "react-data-table-component";
import { useState } from "react";
import EditButton from "../../../components/admin/buttons/EditButton";
import DeleteButton from "../../../components/admin/buttons/DeleteButton";
import { CustomStyles } from "../../../components/shared/CustomStyles";
import NewButton from "../../../components/admin/buttons/NewButton";
import { X } from "lucide-react";

const CandidatesTable = ({ candidates, positions, onEdit, onDelete, onAdd }) => {
  const [filterText, setFilterText] = useState("");

  // Helper: map position_id → description
  const getPositionName = (id) =>
    positions?.find((p) => p.id === id)?.description || "Unknown";

  const columns = [
    {
      name: "Position",
      selector: (row) => getPositionName(row.position_id),
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: "Photo",
      selector: (row) => row.photo,
      cell: (row) =>
        row.photo_url ? (
          <img
            src={`http://localhost/online-voting-system/project/server/uploads/${row.photo}`}
            alt={row.firstname}
            className="w-12 h-12 object-cover rounded-full border border-gray-300"
          />
        ) : (
          <span className="text-gray-400 italic">No photo</span>
        ),
      sortable: false,
    },
    {
      name: "Platform",
      selector: (row) => row.platform,
      sortable: true,
    },
    {
      name: "Actions",
      ignoreRowClick: true,
      allowoverflow: true,
      cell: (row) => (
        <div className="flex gap-2">
          <EditButton onClick={() => onEdit(row)} />
          <DeleteButton onClick={() => onDelete(row.id)} />
        </div>
      ),
    },
  ];

  const filteredData = candidates.filter((c) =>
    `${c.position} ${c.firstname} ${c.lastname}`
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:justify-between md:flex-row">
        <div>
          <NewButton onAdd={onAdd} />
        </div>
        <label
          htmlFor="search"
          className="flex items-center gap-3 text-sm md:text-base"
        >
          Search:
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search candidates..."
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:ring-2 focus:outline-none focus:ring-blue-400 transition-all duration-200"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            {filterText && (
              <button
                type="button"
                onClick={() => setFilterText("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </label>
      </div>
      <div>
        <DataTable
          className="table-fixed w-full"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          pointerOnHover
          customStyles={CustomStyles}
        />
      </div>
    </div>
  );
}

export default CandidatesTable;

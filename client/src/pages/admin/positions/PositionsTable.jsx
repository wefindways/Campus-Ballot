import DataTable from "react-data-table-component";
import { useState } from "react";
import EditButton from "../../../components/admin/buttons/EditButton";
import DeleteButton from "../../../components/admin/buttons/DeleteButton";
import { CustomStyles } from "../../../components/shared/CustomStyles";
import NewButton from "../../../components/admin/buttons/NewButton";
import { X } from "lucide-react";

const PositionsTable = ({ positions, onEdit, onDelete, onAdd }) => {
  const [filterText, setFilterText] = useState("");

  const columns = [
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Max Vote",
      selector: (row) => row.max_vote,
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

  const filteredData = positions.filter(
    (pos) =>
      pos.description.toLowerCase().includes(filterText.toLowerCase()) ||
      pos.max_vote.toString().includes(filterText)
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
              placeholder="Search positions..."
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

export default PositionsTable;

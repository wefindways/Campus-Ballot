export const CustomStyles = {
  headCells: {
    style: {
      fontSize: "18px", // header font size
      fontWeight: "bold",
      "@media (max-width: 640px)": {
        fontSize: "16px",
      },
    },
  },
  cells: {
    style: {
      fontSize: "16px", // row cell font size+
      "@media (max-width: 640px)": {
        fontSize: "14px",
      },
    },
  },
  pagination: {
    style: {
      fontSize: "14px", // font size for pagination
      color: "#374151", // optional: gray-700 for readability
      "@media (max-width: 640px)": {
        fontSize: "14px",
      },
    },
  },
};

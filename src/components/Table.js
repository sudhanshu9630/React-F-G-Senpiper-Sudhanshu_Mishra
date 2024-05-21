import { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
} from "react-table/dist/react-table.development";

import ColumnFilter from "./ColumnFilter";

const Table = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const groupedColNames = [
    {
      Header: "Contact Info",
      columns: [
        {
          Header: "Name",
          accessor: "name",
          Filter: ColumnFilter,
        },
        {
          Header: "E-Mail",
          accessor: "email",
          Filter: ColumnFilter,
        },
        {
          Header: "Phone",
          accessor: "phone",
          Filter: ColumnFilter,
        },
      ],
    },
    {
      Header: "Experience",
      columns: [
        {
          Header: "Host",
          accessor: "hostXp",
          Filter: ColumnFilter,
        },
        {
          Header: "Beverage",
          accessor: "beverageXp",
          Filter: ColumnFilter,
        },
        {
          Header: "Cleanliness",
          accessor: "cleanXp",
          Filter: ColumnFilter,
        },
        {
          Header: "Dining",
          accessor: "diningXp",
          Filter: ColumnFilter,
        },
      ],
    },
  ];

  const mFeedbacks = useMemo(() => feedbacks, [feedbacks]);
  const mColumns = useMemo(() => groupedColNames, []);

  //Get Feedbacks collection from local storage, if it exists
  useEffect(() => {
    const localFeedbacks = localStorage.getItem("feedbacks");
    if (localFeedbacks) {
      setFeedbacks(JSON.parse(localFeedbacks));
    }
  }, []);

  const tableInstance = useTable(
    {
      columns: mColumns,
      data: mFeedbacks,
    },
    useFilters,
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div className="sort-btn-div" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                      <span className="sort-btn">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "🠉"
                            : "🠋"
                          : ""}
                      </span>
                    </div>
                    <div className="filter-bar">
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import React, { FC, useCallback } from "react";
import { useTable, useSortBy, useExpanded } from "react-table";

interface Props {
  data: any;
  columns: any;
}

const Table: FC<Props> = ({ data, columns }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useExpanded
  ) as any;

  const renderRowSubComponent = useCallback(
    () => (
      <div className="space-x-4 py-2">
        <button className="ml-4 bg-[#ff8215] text-white rounded-md p-2 px-4">
          Buy
        </button>
        <button className="bg-[#ff8215] text-white rounded-md p-2 px-4">
          Sell
        </button>
      </div>
    ),
    []
  );

  return (
    <div className="shadow-md w-1/4 rounded-md overflow-hidden">
      <table {...getTableProps()} className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup: any) => (
            <tr className="" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon />
                      ) : (
                        <ChevronUpIcon />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className="bg-white divide-y divide-gray-200"
          {...getTableBodyProps()}
        >
          {rows.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <React.Fragment key={i}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td
                        className="px-6 py-4 whitespace-nowrap"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent()}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

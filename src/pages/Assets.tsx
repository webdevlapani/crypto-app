import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";
import Table from "../components/Table";
import useAssets from "../hooks/useAssets";

const Assets: FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: assets, isLoading } = useAssets(page, limit);

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "metrics",
      Cell: ({ cell: { value } }: any) => value.market_data.price_usd,
    },
    {
      Header: () => null,
      id: "expander",
      Cell: ({ row }: any) => (
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? (
            <ChevronUpIcon height={20} width={20} />
          ) : (
            <ChevronDownIcon height={20} width={20} />
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="">Loading...</span>
        </div>
      ) : (
        assets?.data && (
          <div className="flex justify-center items-center flex-col mt-5">
            <Table data={assets.data} columns={columns} />
            <div className="p-2 space-x-2">
              <button
                disabled={page === 1}
                className={page === 1 ? "cursor-not-allowed" : ""}
                onClick={() => setPage((page) => (page > 1 ? page - 1 : page))}
              >
                Prev
              </button>
              <button onClick={() => setPage((page) => page + 1)}>Next</button>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Assets;

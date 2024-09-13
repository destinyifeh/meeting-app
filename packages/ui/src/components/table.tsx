"use client";

import Pagination from "rc-pagination";
import { ReactNode, useRef } from "react";
import { CiFilter } from "react-icons/ci";

import classNames from "classnames";
import "rc-pagination/assets/index.css";

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactNode;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  rowSelection?: (row: Entry[]) => void;
  isLoading?: boolean;
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (size: number) => void;
  onPageSizeChange: (size: number) => void;
};

export const Table = <Entry extends { idx: string; id: string }>({
  data,
  columns,
  rowSelection,
  isLoading,
  pageSize,
  currentPage,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: TableProps<Entry>) => {
  const checbockRefs = useRef<HTMLInputElement[]>([]);
  const itemsRef = useRef(new Map<string, HTMLInputElement>());

  const selectRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const value of itemsRef.current.values()) {
      value.checked = e.target.checked;
    }
  };

  // if (!data?.length && !isLoading) {
  //   return (
  //     <div className="flex flex-col items-center  text-[18px] justify-center text-gray-500 bg-white h-80">
  //       <h4>No Entries Found</h4>
  //     </div>
  //   );
  // }

  function getMap() {
    if (!checbockRefs.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  return (
    <div>
      <div className="flex gap-2 items-center ml-9 py-4 mb-[16px]">
        <span>
          <CiFilter className="w-[1.6rem] h-[1.6rem] text-muted" />
        </span>
        <h3 className=" font-semibold text-[16px] leading-12">Filter</h3>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            className={classNames(
              "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ",
              isLoading && "h-[400px]",
              !isLoading && !data.length && "h-[400px]"
            )}
          >
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg h-full">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-brand-emphasis">
                  <tr>
                    {rowSelection && (
                      <th className="px-5">
                        <input type="checkbox" onChange={selectRowsChange} />
                      </th>
                    )}
                    {columns.map((column, index) => (
                      <th
                        key={column.title + index}
                        scope="col"
                        className="px-6 py-3 capitalize text-[16px] font-semibold tracking-wider text-left text-default"
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="relative min-h-[30rem] w-full">
                  {/* {!isLoading && !data.length ? (
                    <div className="absolute w-full left-0 h-[300px] p-8">
                      <h4 className="animate-pulse relative h-14 block bg-gray-300 s mb-4 w-full">
                        No entery
                      </h4>
                    </div>
                  ) : null} */}
                  {isLoading && (
                    <tr className="absolute w-full left-0 h-[300px] p-8">
                      {[1, 2, 3, 4, 5, 9, 11, 12].map((item) => (
                        <td
                          className="animate-pulse relative h-14 block bg-gray-300 s mb-4 w-full"
                          key={item}
                        ></td>
                      ))}
                    </tr>
                  )}

                  {!isLoading && data.length > 0 ? (
                    data.map((entry, entryIndex) => {
                      return (
                        <tr
                          key={entry?.id || entryIndex}
                          className="odd:bg-white even:bg-brand-emphasis"
                        >
                          {rowSelection && (
                            <td className=" px-5 py-7 flex shrink-0 flex-1 items-center justify-center ">
                              <input
                                type="checkbox"
                                ref={(node) => {
                                  const map = getMap();

                                  if (node) {
                                    map?.set(`${entryIndex}`, node);
                                  } else {
                                    map?.delete(`${entryIndex}`);
                                  }
                                }}
                                data-value={entryIndex}
                                // onChange={(e) => onChange(e, entryIndex)}
                              />
                            </td>
                          )}
                          {columns.map(
                            ({ Cell, field, title }, columnIndex) => (
                              <td
                                key={title + columnIndex}
                                className="px-6 py-7 text-[16px] leading-[19.2px] font-lato font-normal  text-default whitespace-nowrap"
                              >
                                {Cell ? (
                                  <Cell entry={entry} />
                                ) : (
                                  (entry[field] as ReactNode)
                                )}
                              </td>
                            )
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      {!isLoading && (
                        <div className=" left-0 w-full absolute p-8 text-center flex flex-col items-center  text-[18px] justify-center text-gray-500 h-80">
                          <div className="h-14 block mb-4 w-full">
                            No Entries Found
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </tbody>
              </table>

              {!isLoading && data.length ? (
                <PaginatedTable
                  totalItems={totalItems}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaginatedTable = ({
  totalItems = 10,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: {
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (size: number) => void;
  onPageSizeChange: (size: number) => void;
}) => {
  const onPageChangeHandler = (page: number) => {
    // setCurrentPage(page);

    onPageChange(page);
  };

  const onPageSizeChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // setPageSize(Number(event.target.value));
    // setCurrentPage(1); // Reset to the first page when page size changes
    onPageSizeChange(Number(event.target.value));
    onPageChange(1);
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between bg-brand-emphasis px-[2rem] py-[1.3rem]">
      <div className="text-gray-600">
        {startItem}-{endItem} of {totalItems}
      </div>
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Rows per page:</span>
          <select
            value={pageSize}
            onChange={onPageSizeChangeHandler}
            className="border border-gray-300 rounded-md text-gray-600"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={onPageChangeHandler}
          showSizeChanger={true}
          className="flex items-center  space-x-2 justify-center "
          itemRender={(current, type, element) => {
            if (type === "prev") {
              return (
                <span className="px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-md">
                  {"<"}
                </span>
              );
            }
            if (type === "next") {
              return (
                <span className="px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-md">
                  {">"}
                </span>
              );
            }
            if (type === "page") {
              return (
                <span className="text-gray-600 border-none">
                  {currentPage}/{Math.ceil(totalItems / pageSize)}
                </span>
              );
            }

            <button
              className={`px-3 py-1 ${
                currentPage === current
                  ? "text-white bg-blue-500"
                  : "text-gray-600"
              } border border-gray-300 rounded-md`}
              style={{
                borderColor: currentPage === current ? "transparent" : "",
              }}
            >
              {current}
            </button>;

            return <span className="border-none bg-[red]">{element}</span>;
          }}
        />
      </div>
    </div>
  );
};

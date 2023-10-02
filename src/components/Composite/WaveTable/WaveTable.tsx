import { SortColumn, TableProps } from '@/components/Data-Display/Table';
import Table from '@/components/Data-Display/Table/Table';
import Search from '@/components/Inputs/Search';
import Pagination from '@/components/Navigation/Pagination';
import { paginate } from '@/lib/paginate';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

export type WaveTableProps<Entry> = TableProps<Entry> & {
  pageSize?: number;
  children?: React.ReactNode;
};

function WaveTable<Entry extends { [P in keyof Entry]: Entry[P] }>({
  columns,
  data,
  children,
  sortColumn = { field: columns[0]?.field, order: 'asc' },
  pageSize = 5,
}: WaveTableProps<Entry>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState<SortColumn<Entry>>(sortColumn);

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const filterableFields = useMemo(
    () => columns.filter((column) => !column.ignoreFiltering),
    [columns]
  );

  const filteredData: Entry[] = useMemo(() => {
    if (!searchTerm.trim().length) return data;

    const regEx = new RegExp(searchTerm.trim(), 'i');
    const filtered = data.filter((entry) => {
      for (let i = 0; i < filterableFields.length; i++) {
        if (!filterableFields[i].ignoreFiltering)
          if (regEx.test(entry[filterableFields[i].field] as string))
            return true;
      }

      return false;
    });
    return filtered;
  }, [data, searchTerm, filterableFields]);

  const orderedData: Entry[] = useMemo(
    () => _.orderBy(filteredData, [sortCol.field], [sortCol.order]),
    [filteredData, sortCol]
  );

  const pagedData: Entry[] = useMemo(
    () => paginate(orderedData ?? [], currentPage, pageSize),
    [orderedData, currentPage, pageSize]
  );

  return (
    <>
      <div className="py-2 px-4 flex justify-between items-end flex-row-reverse sm:px-6 lg:px-8">
        <div className="w-72">
          {data.length > 0 && (
            <Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
        {children}
      </div>
      <Table<Entry>
        columns={columns}
        data={pagedData}
        onSort={setSortCol}
        sortColumn={sortCol}
      />
      <div className="sm:px-6 lg:px-8">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          itemCount={filteredData.length}
        />
      </div>
    </>
  );
}

export default WaveTable;

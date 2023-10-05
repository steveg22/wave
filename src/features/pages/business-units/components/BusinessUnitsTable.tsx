import Table, { TableColumn } from '@/components/Data-Display/Table';
import ContentLayout from '@/components/Layouts/ContentLayout';
import Badge from '@/components/Data-Display/Badge';
import react from 'react';
import useBusinessUnitsTableData, {
  BusinessUnitTableRecord,
} from '../hooks/useBusinessUnitsTableData';

function BusinessUnitsTable() {
  const { data, error, isLoading } = useBusinessUnitsTableData();

  const Test = react.useCallback(
    (bu: { entry: BusinessUnitTableRecord }) => (
      <Badge variant='success' label={bu.entry.id} />
    ),
    []
  );

  const columns: TableColumn<BusinessUnitTableRecord>[] = [
    { field: 'name', label: 'name' },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Test,
    },
  ];

  return (
    <ContentLayout title="Business Units">
      <Table<BusinessUnitTableRecord> data={data} columns={columns} />
    </ContentLayout>
  );
}

export default BusinessUnitsTable;

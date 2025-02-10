import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Plus } from 'lucide-react';

type Student = {
  wallet: string;
  verifiedSubmissions: number;
};

type StudentsProps = {
  students: Student[];
  setAddStudentsDialogActive: (value: boolean) => void;
  isOwner: boolean;
  loading: boolean;
};

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'wallet',
    header: 'Wallet',
  },
  {
    accessorKey: 'verifiedSubmissions',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Verified Submissions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const Students = ({
  students,
  loading,
  isOwner,
  setAddStudentsDialogActive,
}: StudentsProps) => {
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Students</h1>
        {isOwner && (
          <Button onClick={() => setAddStudentsDialogActive(true)}>
            <Plus />
            Add student
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={students} loading={loading} />
    </div>
  );
};

export default Students;

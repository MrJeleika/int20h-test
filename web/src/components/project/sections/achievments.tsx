import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { Achievement } from '@/hooks/queries/use-achievements';

type AchievementsProps = {
  achievements: Achievement[];
  verify: (value: string) => void;
  loading: boolean;
};

const columns: ColumnDef<Achievement>[] = [
  {
    accessorKey: 'student',
    header: 'Wallet',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'isVerified',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Is Verified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <Checkbox disabled checked={cell.row.original.isVerified} />;
    },
  },
  {
    header: '',
    accessorKey: 'actions',
    cell: ({ cell, table }) => {
      return (
        !cell.row.original.isVerified && (
          <Button
            onClick={() => table.options.meta?.callback(cell.row.original.id)}
          >
            <Check />
            Verify
          </Button>
        )
      );
    },
  },
];

const Achievements = ({ achievements, loading, verify }: AchievementsProps) => {
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Achievements</h1>
      </div>
      <DataTable
        columns={columns}
        data={achievements}
        loading={loading}
        callback={verify}
      />
    </div>
  );
};

export default Achievements;

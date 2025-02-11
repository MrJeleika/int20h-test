import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { Achievement } from '@/hooks/queries/use-achievements';

type AchievementsProps = {
  achievements: Achievement[];
  requiredVerifications: number;
  verify: (value: number) => void;
  loading: boolean;
};

type TableMeta = {
  verify: (value: number) => void;
  requiredVerifications: number;
};

const columns: ColumnDef<Achievement>[] = [
  {
    accessorKey: 'studentWallet',
    header: 'Wallet',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'verificationCount',
    header: 'Verifications',
    cell: ({ cell, table }) => {
      const meta = table.options.meta as TableMeta;
      return (
        <>
          {cell.row.original.verifiedCount}/{meta.requiredVerifications}
        </>
      );
    },
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
    accessorKey: 'nftTokenId',
    header: 'NFT Id',
  },
  {
    header: '',
    accessorKey: 'actions',
    cell: ({ cell, table }) => {
      const meta = table.options.meta as TableMeta;
      return (
        cell.row.original.canVerify && (
          <Button onClick={() => meta?.verify(cell.row.original.id)}>
            <Check />
            Verify
          </Button>
        )
      );
    },
  },
];

const Achievements = ({
  achievements,
  loading,
  requiredVerifications,
  verify,
}: AchievementsProps) => {
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Achievements</h1>
      </div>
      <DataTable
        columns={columns}
        data={achievements}
        loading={loading}
        meta={{ verify, requiredVerifications }}
      />
    </div>
  );
};

export default Achievements;

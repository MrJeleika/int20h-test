import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { Achievement } from '@/hooks/queries/use-achievements';

type MyAchievementsProps = {
  achievements: Achievement[];
  loading: boolean;
  deadlinePassed: boolean;
  setSubmitAchievementDialog: (value: boolean) => void;
};

const columns: ColumnDef<Achievement>[] = [
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
    accessorKey: 'nftTokenId',
    header: 'NFT Id',
  },
];

const MyAchievements = ({
  achievements,
  setSubmitAchievementDialog,
  loading,
  deadlinePassed,
}: MyAchievementsProps) => {
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">My Achievements</h1>
        {deadlinePassed && (
          <Button onClick={() => setSubmitAchievementDialog(true)}>
            <Plus />
            Submit achievement
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={achievements} loading={loading} />
    </div>
  );
};

export default MyAchievements;

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

type VerifiersProps = {
  verifiers: string[];
  setAddVerifierDialogActive: (value: boolean) => void;
  isOwner: boolean;
  loading: boolean;
};

const columns: ColumnDef<string>[] = [
  {
    accessorKey: 'wallet',
    header: 'Wallet',
  },
];

const Verifiers = ({
  verifiers,
  loading,
  isOwner,
  setAddVerifierDialogActive,
}: VerifiersProps) => {
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Verifiers</h1>
        {isOwner && (
          <Button onClick={() => setAddVerifierDialogActive(true)}>
            <Plus />
            Add verifier
          </Button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={verifiers.map((value) => {
          return { wallet: value };
        })}
        loading={loading}
      />
    </div>
  );
};

export default Verifiers;

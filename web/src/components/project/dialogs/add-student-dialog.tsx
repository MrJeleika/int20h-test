import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type AddStudentDialogProps = {
  onSubmit: (id: string) => void;
  loading: boolean;
  active: boolean;
  setActive: (value: boolean) => void;
};

const AddStudentDialog = ({
  onSubmit,
  loading,
  active,
  setActive,
}: AddStudentDialogProps) => {
  const [isValid, setIsValid] = useState<boolean>();
  const [studentWallet, setStudentWallet] = useState<string>();

  useEffect(() => setIsValid(!!studentWallet), [studentWallet]);

  return (
    <Dialog open={active} onOpenChange={!loading ? setActive : () => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add student</DialogTitle>
          <DialogDescription>
            Enter wallet address of your student
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="id"
            value={studentWallet}
            placeholder="Student wallet"
            onChange={(e) => setStudentWallet(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button
            disabled={!isValid || loading}
            onClick={() => studentWallet && onSubmit(studentWallet)}
            type="submit"
          >
            {loading && <Loader2 className="animate-spin" />}
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;

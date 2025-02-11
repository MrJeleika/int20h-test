import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';

type JoinProjectDialogProps = {
  onSubmit: (id: number) => void;
  loading: boolean;
  active: boolean;
  setActive: (value: boolean) => void;
};

const JoinProjectDialog = ({
  onSubmit,
  loading,
  active,
  setActive,
}: JoinProjectDialogProps) => {
  const [isValid, setIsValid] = useState<boolean>();
  const [projectId, setProjectId] = useState<number>();

  useEffect(() => setIsValid(projectId != undefined), [projectId]);

  return (
    <Dialog open={active} onOpenChange={!loading ? setActive : () => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join project</DialogTitle>
          <DialogDescription>Enter id of the project</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="id"
            value={projectId}
            placeholder="Project Id"
            type="number"
            onChange={(e) => setProjectId(Number.parseInt(e.target.value))}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button
            disabled={!isValid || loading}
            onClick={() => projectId && onSubmit(projectId)}
            type="submit"
          >
            {loading && <Loader2 className="animate-spin" />}
            Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinProjectDialog;

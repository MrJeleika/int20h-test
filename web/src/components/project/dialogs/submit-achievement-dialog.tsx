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

type SubmitAchievementDialogProps = {
  onSubmit: (description: string) => void;
  loading: boolean;
  active: boolean;
  setActive: (value: boolean) => void;
};

const SubmitAchievementDialog = ({
  onSubmit,
  loading,
  active,
  setActive,
}: SubmitAchievementDialogProps) => {
  const [isValid, setIsValid] = useState<boolean>();
  const [description, setDescription] = useState<string>();

  useEffect(() => setIsValid(!!description), [description]);

  return (
    <Dialog open={active} onOpenChange={!loading ? setActive : () => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Achievement</DialogTitle>
          <DialogDescription>
            Enter description of your achievement
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="id"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button
            disabled={!isValid || loading}
            onClick={() => description && onSubmit(description)}
            type="submit"
          >
            {loading && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitAchievementDialog;

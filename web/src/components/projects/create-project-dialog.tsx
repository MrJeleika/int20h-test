import { CalendarIcon, Loader2, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
import { Label } from '../ui/label';
import { CreateProject } from '@/hooks/mutations/use-create-project';
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';

type CreateProjectDialogProps = {
  onSubmit: (data: CreateProject) => void;
  loading: boolean;
  active: boolean;
  setActive: (value: boolean) => void;
};

const CreateProjectDialog = ({
  onSubmit,
  loading,
  active,
  setActive,
}: CreateProjectDialogProps) => {
  const [isValid, setIsValid] = useState<boolean>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [finishDate, setFinishDate] = useState<Date>();
  const [hasReward, setHasReward] = useState<boolean>();
  const [rewardSum, setRewardSum] = useState<number>();
  const [isPublic, setIsPublic] = useState<boolean>();

  const handleSubmit = useCallback(() => {
    const data = {
      title: title,
      description: description,
      finishDate: finishDate,
      isPublic: isPublic,
      reward: hasReward ? rewardSum : undefined,
    } as CreateProject;

    onSubmit(data);
  }, [
    title,
    description,
    finishDate,
    isPublic,
    hasReward,
    rewardSum,
    onSubmit,
  ]);

  const startDate = useMemo(() => {
    const nextUtcDay = new Date();
    nextUtcDay.setUTCDate(nextUtcDay.getUTCDate() + 1);
    nextUtcDay.setUTCHours(0, 0, 0, 0);

    return nextUtcDay;
  }, []);

  useEffect(
    () =>
      setIsValid(
        !!title && !!description && !!finishDate && (!hasReward || !!rewardSum),
      ),
    [title, description, finishDate, hasReward, rewardSum],
  );

  return (
    <Dialog open={active} onOpenChange={!loading ? setActive : () => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Fill information about your project
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="date">Finish date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
                    !finishDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {finishDate ? (
                    finishDate.toDateString()
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  fromDate={startDate}
                  selected={finishDate}
                  onSelect={setFinishDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reward"
                onClick={() => setHasReward((prev) => !prev)}
                checked={hasReward}
              />
              <Label htmlFor="reward">Has Reward</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="public"
                onClick={() => setIsPublic((prev) => !prev)}
                checked={isPublic}
              />
              <Label htmlFor="public">Public</Label>
            </div>
          </div>
          {hasReward && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="reward">Reward Sum</Label>
              <div className="relative">
                <Input
                  id="reward"
                  placeholder="Reward"
                  type="number"
                  value={rewardSum}
                  onChange={(e) =>
                    setRewardSum(Number.parseFloat(e.target.value))
                  }
                />
                <img
                  src="./images/eth-logo.svg"
                  className="font-white absolute right-3 top-1/2 z-10 w-4 -translate-y-1/2 transform"
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            disabled={!isValid || loading}
            onClick={handleSubmit}
            type="submit"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Plus />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ProjectDetail } from '@/hooks/queries/use-project';

type InformationProps = {
  projectData?: ProjectDetail;
  loading: boolean;
  endProject: () => void;
  isOwner: boolean;
  deadlinePassed: boolean;
};

const Information = ({
  projectData,
  loading,
  isOwner,
  deadlinePassed,
  endProject,
}: InformationProps) => {
  return (
    <div className="mx-auto w-full p-6 shadow-lg">
      <header className="flex gap-8">
        {loading ? (
          <Skeleton className="mb-2 h-6 w-3/4" />
        ) : (
          <>
            <h1 className="text-2xl font-bold">{projectData?.title}</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h1 className="text-2xl font-bold">ID: {projectData?.id}</h1>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this ID to your students</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </header>
      <main className="mt-4">
        {loading ? (
          <>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-5/6" />
            <Skeleton className="mb-2 h-4 w-3/4" />
          </>
        ) : (
          projectData && (
            <>
              <p className="text-sm text-gray-600">
                {projectData?.description}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                End Date: {projectData?.endDate.toDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Owner: {projectData?.owner}
              </p>

              {isOwner && !projectData.isFinished && deadlinePassed && (
                <>
                  <p className="mb-2 mt-6 text-sm text-gray-500">
                    After pressing this button, project will be finished and MVP
                    student will receive {projectData.reward} ETH as reward
                    <br /> If zero verified achievements were submitted, you
                    will receive a refund
                  </p>
                  <Button onClick={endProject}>End Project</Button>
                </>
              )}
            </>
          )
        )}
      </main>
    </div>
  );
};

export default Information;

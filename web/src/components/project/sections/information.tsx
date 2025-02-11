import { Skeleton } from '@/components/ui/skeleton';

type InformationProps = {
  projectData?: {
    title: string;
    description: string;
    endDate: Date;
    owner: string;
  };
  loading: boolean;
};

const Information = ({ projectData, loading }: InformationProps) => {
  return (
    <div className="mx-auto w-full p-6 shadow-lg">
      <header>
        {loading ? (
          <Skeleton className="mb-2 h-6 w-3/4" />
        ) : (
          <h1 className="text-2xl font-bold">{projectData?.title}</h1>
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
          <>
            <p className="text-sm text-gray-600">{projectData?.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              End Date: {projectData?.endDate.toDateString()}
            </p>
            <p className="text-sm text-gray-500">Owner: {projectData?.owner}</p>
          </>
        )}
      </main>
    </div>
  );
};

export default Information;

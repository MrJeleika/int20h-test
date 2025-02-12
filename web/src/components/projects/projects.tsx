import { useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import type { Project } from '@/hooks/queries/use-projects';
import { routes } from '@/router';

type ProjectsProps = {
  projects: Project[];
  isLoading: boolean;
  setJoinDialogActive: (value: boolean) => void;
};

const Projects = ({
  projects,
  isLoading,
  setJoinDialogActive,
}: ProjectsProps) => {
  const navigate = useNavigate();

  return projects.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {!isLoading
        ? projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => navigate(`${routes.project}/${project.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">{project.name}</h2>
                  <h3>{project.type}</h3>
                </div>
                <div className="flex align-top">
                  <p className="w-[60%] text-sm text-gray-500">
                    {project.description}
                  </p>
                  {project.reward > 0 && (
                    <h3 className="ml-auto">{project.reward} ETH</h3>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        : Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
    </div>
  ) : (
    <div className="mt-36 flex flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold">
        You haven't joined any projects yet
      </h2>
      <p className="text-sm text-gray-500">
        Explore and join projects to get started!
      </p>
      <Button className="mt-4" onClick={() => setJoinDialogActive(true)}>
        Join Project
      </Button>
    </div>
  );
};

export default Projects;

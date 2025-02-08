import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import type { Project } from '@/hooks/queries/use-projects';
import { routes } from '@/router';

type ProjectsProps = {
  projects: Project[];
  isLoading: boolean;
};

const Projects = ({ projects, isLoading }: ProjectsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {!isLoading
        ? projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => navigate(`${routes.project}/${project.id}`)}
            >
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{project.name}</h2>
                <p className="text-sm text-gray-500">{project.description}</p>
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
  );
};

export default Projects;

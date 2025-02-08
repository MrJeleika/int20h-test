import { useQuery } from '@tanstack/react-query';

export type Project = {
  id: number;
  name: string;
  description: string;
};

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const mock = [
        {
          id: 1,
          name: 'Project Alpha',
          description: 'A cutting-edge AI initiative.',
        },
        {
          id: 2,
          name: 'Project Beta',
          description: 'Blockchain-based security system.',
        },
        {
          id: 3,
          name: 'Project Gamma',
          description: 'Next-gen cloud computing platform.',
        },
        {
          id: 4,
          name: 'Project Delta',
          description: 'An innovative VR experience.',
        },
      ] as Project[];
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return mock;
    },
  });
};

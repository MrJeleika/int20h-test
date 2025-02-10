import { useQuery } from '@tanstack/react-query';

export type ProjectDetail = {
  title: string;
  description: string;
  endDate: Date;
  owner: string;
};

export const useProject = () => {
  return useQuery<ProjectDetail>({
    queryKey: ['project'],
    queryFn: async () => {
      const mock = {
        id: 1,
        description: 'A cutting-edge AI initiative.',
        endDate: new Date(),
        owner: 'xxxxxxxxxxxxxxxxxxxxxxxx',
        title: 'Project Alpha',
      } as ProjectDetail;
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return mock;
    },
  });
};

import { useMutation } from '@tanstack/react-query';

export type CreateProject = {
  title: string;
  description: string;
  finishDate: Date;
  isPublic: boolean;
  reward?: number;
};

export const useCreateProject = () => {
  return useMutation({
    async mutationFn(data: CreateProject) {
      console.warn(data);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  });
};

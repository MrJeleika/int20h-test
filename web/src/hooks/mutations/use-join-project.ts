import { useMutation } from '@tanstack/react-query';

export const useJoinProject = () => {
  return useMutation({
    async mutationFn(id: string) {
      console.warn(id);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  });
};

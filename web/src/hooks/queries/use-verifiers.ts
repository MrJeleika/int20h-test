import { useQuery } from '@tanstack/react-query';

export const useVerifiers = () => {
  return useQuery<string[]>({
    queryKey: ['verifiers'],
    queryFn: async () => {
      const mock = [
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      ];
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return mock;
    },
  });
};

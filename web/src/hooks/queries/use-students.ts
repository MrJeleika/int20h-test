import { useQuery } from '@tanstack/react-query';

type Student = {
  wallet: string;
  verifiedSubmissions: number;
};

export const useStudents = () => {
  return useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: async () => {
      const mock = [
        {
          wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          verifiedSubmissions: 21,
        },
        {
          wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          verifiedSubmissions: 8,
        },
        {
          wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          verifiedSubmissions: 15,
        },
        {
          wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          verifiedSubmissions: 2,
        },
        {
          wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          verifiedSubmissions: 23,
        },
        {
          wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          verifiedSubmissions: 4,
        },
        {
          wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          verifiedSubmissions: 2,
        },
        {
          wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          verifiedSubmissions: 1,
        },
      ] as Student[];
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return mock;
    },
  });
};

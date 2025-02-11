import { useQuery } from '@tanstack/react-query';

export type Achievement = {
  id: number;
  student: string;
  isVerified: boolean;
  description: string;
};

export const useAchievements = () => {
  return useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: async () => {
      const mock = [
        {
          student: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          description: 'idkgeswgwegwegewgewfgwe wergwege wg 3gewg wgew',
          isVerified: true,
          id: 1,
        },
        {
          student: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          description: 'idkgeswgwegwegewgewfgwe wergwege wg 3gewg wgew',
          isVerified: true,
          id: 2,
        },
        {
          student: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          description: 'idkgeswgwegwegewgewfgwe wergwege wg 3gewg wgew',
          isVerified: true,
          id: 3,
        },
        {
          student: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          description: 'idkgeswgwegwegewgewfgwe wergwege wg 3gewg wgew',
          isVerified: true,
          id: 4,
        },
        {
          student: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          description: 'idkgeswgwegwegewgewfgwe wergwege wg 3gewg wgew',
          isVerified: true,
          id: 5,
        },
        {
          student: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          description: 'idkgeswgwegwegewgewfgwe wergwege wg 3gewg wgew',
          isVerified: true,
          id: 6,
        },
        {
          student: '0xd899067B8fEFaA4A130a0e1B9C5B1C05f688883c',
          description: 'idkgeswgwegwegewgewfgwe wergwege wg 3gewg wgew',
          isVerified: true,
          id: 7,
        },
        {
          student: '0xd899067B8fEFaA4A130a0e1B9C5B1C05f688883c',
          description: 'idkgeswgwegwegewgewfgwe wergwege wg 3gewg wgew',
          isVerified: false,
          id: 8,
        },
      ] as Achievement[];
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return mock;
    },
  });
};

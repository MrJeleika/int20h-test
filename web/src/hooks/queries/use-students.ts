import abi from '@/lib/contractAbi';

import { useReadContract } from 'wagmi';

type Student = {
  wallet: string;
  verifiedSubmissions: number;
};

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ID;

export const useStudents = (sender?: string, projectId?: number) => {
  const senderAddress = sender as `0x${string}`;

  return useReadContract({
    abi: abi,
    functionName: 'getProjectStudents',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    args: [BigInt(projectId ?? -1)],
    query: {
      enabled: projectId !== undefined,
      select: (data) =>
        data.map((x) => {
          return {
            wallet: x.wallet,
            verifiedSubmissions: Number(x.achievements),
          } as Student;
        }),
    },
  });
};

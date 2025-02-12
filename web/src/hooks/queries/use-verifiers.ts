import { useReadContract } from 'wagmi';

import abi from '@/lib/contractAbi';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ID;

export const useVerifiers = (sender?: string, projectId?: number) => {
  const senderAddress = sender as `0x${string}`;

  return useReadContract({
    abi: abi,
    functionName: 'getProjectVerifiers',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    args: [BigInt(projectId ?? -1)],
    query: {
      enabled: projectId !== undefined,
      select: (data) => data.map((x) => x.wallet),
    },
  });
};

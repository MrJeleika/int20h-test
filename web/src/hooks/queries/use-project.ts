import { formatEther } from 'viem';
import { useReadContract } from 'wagmi';

import abi from '@/lib/contractAbi';

export type ProjectDetail = {
  id: number;
  title: string;
  description: string;
  endDate: Date;
  owner: string;
  requiredVerifications: number;
  isFinished: boolean;
  reward: number;
};
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ID;

export const useProject = (sender?: string, id?: number) => {
  const senderAddress = sender as `0x${string}`;

  const contract = useReadContract({
    abi: abi,
    functionName: 'getAllProjects',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    query: {
      enabled: id !== undefined,
      select: (data) => {
        const project = data?.find((x) => x.projectId == BigInt(id!));

        return project
          ? ({
              id: Number(project.projectId),
              title: project.title,
              description: project.title,
              endDate: new Date(Number(project.deadlineTimestamp)),
              owner: project?.owner,
              requiredVerifications: Number(project.requiredVerificationsCount),
              isFinished: project.isFinished,
              reward: Number.parseFloat(formatEther(project.rewardAmount)),
            } as ProjectDetail)
          : undefined;
      },
    },
  });

  return contract;
};

import abi from '@/lib/contractAbi';
import { useMemo } from 'react';
import { useReadContract } from 'wagmi';

export type Project = {
  id: number;
  name: string;
  description: string;
  type: 'participated' | 'owned' | 'verification';
};

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ID;

export const useProjects = (sender?: string) => {
  const senderAddress = sender as `0x${string}`;

  const { data: participatedProjects, isLoading: participatedProjectsLoading } =
    useReadContract({
      abi: abi,
      functionName: 'getMyParticipatedProjects',
      address: CONTRACT_ADDRESS,
      account: senderAddress,
    });

  const { data: ownProjects, isLoading: ownProjectsLoading } = useReadContract({
    abi: abi,
    functionName: 'getMyOwnedProjects',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
  });

  const { data: verificationProjects, isLoading: verificationProjectsLoading } =
    useReadContract({
      abi: abi,
      functionName: 'getMyVerificationProjects',
      address: CONTRACT_ADDRESS,
      account: senderAddress,
    });

  const loading = useMemo(
    () =>
      participatedProjectsLoading ||
      ownProjectsLoading ||
      verificationProjectsLoading,
    [
      participatedProjectsLoading,
      ownProjectsLoading,
      verificationProjectsLoading,
    ],
  );

  const data = useMemo(() => {
    const data = [] as Project[];

    ownProjects?.forEach((x) => {
      if (!data.find((d) => Number(x.projectId) == d.id)) {
        data.push({
          id: Number(x.projectId),
          type: 'owned',
          name: x.title,
          description: x.description,
        });
      }
    });

    verificationProjects?.forEach((x) => {
      if (!data.find((d) => Number(x.projectId) == d.id)) {
        data.push({
          id: Number(x.projectId),
          type: 'verification',
          name: x.title,
          description: x.description,
        });
      }
    });

    participatedProjects?.forEach((x) => {
      if (!data.find((d) => Number(x.projectId) == d.id)) {
        data.push({
          id: Number(x.projectId),
          type: 'participated',
          name: x.title,
          description: x.description,
        });
      }
    });

    return data;
  }, [participatedProjects, ownProjects, verificationProjects]);

  return { data, loading };
};

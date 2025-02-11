import { useCallback, useMemo } from 'react';
import { useReadContract } from 'wagmi';

import abi from '@/lib/contractAbi';

export type Project = {
  id: number;
  name: string;
  description: string;
  type: 'participated' | 'owned' | 'verification';
};

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ID;

export const useProjects = (sender?: string) => {
  const senderAddress = sender as `0x${string}`;

  const {
    data: participatedProjects,
    isLoading: participatedProjectsLoading,
    refetch: participatedRefetch,
  } = useReadContract({
    abi: abi,
    functionName: 'getMyParticipatedProjects',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    query: {
      select: (data) =>
        data.map((x) => {
          return {
            id: Number(x.projectId),
            type: 'participated',
            name: x.title,
            description: x.description,
          } as Project;
        }),
    },
  });

  const {
    data: ownProjects,
    isLoading: ownProjectsLoading,
    refetch: ownedRefetch,
  } = useReadContract({
    abi: abi,
    functionName: 'getMyOwnedProjects',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    query: {
      select: (data) =>
        data.map((x) => {
          return {
            id: Number(x.projectId),
            type: 'owned',
            name: x.title,
            description: x.description,
          } as Project;
        }),
    },
  });

  const {
    data: verificationProjects,
    isLoading: verificationProjectsLoading,
    refetch: verificationRefetch,
  } = useReadContract({
    abi: abi,
    functionName: 'getMyVerificationProjects',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    query: {
      select: (data) =>
        data.map((x) => {
          return {
            id: Number(x.projectId),
            type: 'verification',
            name: x.title,
            description: x.description,
          } as Project;
        }),
    },
  });

  const refetch = useCallback(async () => {
    await Promise.all([
      verificationRefetch(),
      ownedRefetch(),
      participatedRefetch(),
    ]);
  }, [verificationRefetch, ownedRefetch, participatedRefetch]);

  const loading = useMemo(() => {
    return (
      participatedProjectsLoading ||
      ownProjectsLoading ||
      verificationProjectsLoading
    );
  }, [
    participatedProjectsLoading,
    ownProjectsLoading,
    verificationProjectsLoading,
  ]);

  const data = useMemo(() => {
    const data = [] as Project[];

    ownProjects?.forEach((x) => {
      if (!data.find((d) => Number(x.id) == d.id)) {
        data.push(x);
      }
    });

    verificationProjects?.forEach((x) => {
      if (!data.find((d) => Number(x.id) == d.id)) {
        data.push(x);
      }
    });

    participatedProjects?.forEach((x) => {
      if (!data.find((d) => Number(x.id) == d.id)) {
        data.push(x);
      }
    });

    return data;
  }, [participatedProjects, ownProjects, verificationProjects]);

  return { data, loading, refetch };
};

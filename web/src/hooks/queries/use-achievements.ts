import { useCallback, useMemo } from 'react';
import { useReadContract } from 'wagmi';

import abi from '@/lib/contractAbi';

export type Achievement = {
  id: number;
  verifiedCount: number;
  studentWallet: string;
  isVerified: boolean;
  description: string;
  canVerify: boolean;
  nftTokenId?: number;
};

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ID;

export const useAchievements = (sender?: string, projectId?: number) => {
  const senderAddress = sender as `0x${string}`;

  const {
    data: unverifiedData,
    isLoading: unverifiedLoading,
    refetch: refetchUnverified,
  } = useReadContract({
    abi: abi,
    functionName: 'getUnverifiedAchievementsForVerifier',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    args: [BigInt(projectId ?? 0)],
    query: {
      enabled: projectId !== undefined,
      select: (data) =>
        data.map((x) => {
          return {
            id: Number(x.achievementId),
            canVerify: !x.isVerified ? true : false,
            description: x.description,
            isVerified: x.isVerified,
            studentWallet: x.studentWallet,
            verifiedCount: Number(x.verifiedCount),
            nftTokenId: x.isVerified ? Number(x.nftTokenId) : null,
          } as Achievement;
        }),
    },
  });

  const {
    data: verifiedData,
    isLoading: verifiedLoading,
    refetch: refetchVerified,
  } = useReadContract({
    abi: abi,
    functionName: 'getVerifiedAchievementsForVerifier',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    args: [BigInt(projectId ?? 0)],
    query: {
      enabled: projectId !== undefined,
      select: (data) =>
        data.map((x) => {
          return {
            id: Number(x.achievementId),
            canVerify: false,
            description: x.description,
            isVerified: x.isVerified,
            studentWallet: x.studentWallet,
            verifiedCount: Number(x.verifiedCount),
            nftTokenId: x.isVerified ? Number(x.nftTokenId) : null,
          } as Achievement;
        }),
    },
  });

  const data = useMemo(
    () => [...(unverifiedData ?? []), ...(verifiedData ?? [])],
    [unverifiedData, verifiedData],
  );

  const isLoading = useMemo(
    () => verifiedLoading || unverifiedLoading,
    [verifiedLoading, unverifiedLoading],
  );

  const refetch = useCallback(async () => {
    await Promise.all([refetchVerified(), refetchUnverified()]);
  }, [refetchVerified, refetchUnverified]);

  return { data, isLoading, refetch };
};

export const useMyAchievements = (sender?: string, projectId?: number) => {
  const senderAddress = sender as `0x${string}`;

  return useReadContract({
    abi: abi,
    functionName: 'getAllMyAchievementsForStudent',
    address: CONTRACT_ADDRESS,
    account: senderAddress,
    query: {
      enabled: projectId !== undefined,
      select: (data) =>
        data
          .filter((x) => x.projectId === BigInt(projectId ?? -1))
          .map((x) => {
            return {
              id: Number(x.achievementId),
              canVerify: false,
              description: x.description,
              isVerified: x.isVerified,
              studentWallet: x.studentWallet,
              verifiedCount: Number(x.verifiedCount),
              nftTokenId: x.isVerified ? Number(x.nftTokenId) : null,
            } as Achievement;
          }),
    },
  });
};

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { Backpack, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';

import CreateProjectDialog from '@/components/projects/create-project-dialog';
import JoinProjectDialog from '@/components/projects/join-project-dialog';
import Projects from '@/components/projects/projects';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CreateProject } from '@/hooks/mutations/use-create-project';
import abi from '@/lib/contractAbi';
import { useProjects } from '@/hooks/queries/use-projects';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ID;
export default function Home() {
  const accountInfo = useAppKitAccount();
  const { open } = useAppKit();

  const { data, loading } = useProjects(accountInfo.address);

  const [joinDialogActive, setJoinDialogActive] = useState(false);
  const [createDialogActive, setCreateDialogActive] = useState(false);

  const {
    writeContractAsync: writeJoinProject,
    isPending: isJoinPending,
    status: joinStatus,
  } = useWriteContract();

  const {
    writeContractAsync: writeCreateProject,
    isPending: isCreatePending,
    status: createStatus,
  } = useWriteContract();
  const createProject = useCallback(
    (data: CreateProject) => {
      writeCreateProject({
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: 'createProject',
        args: [
          data.title,
          data.description,
          BigInt(data.finishDate.getTime()),
          data.isPublic,
        ],
      });
    },
    [writeCreateProject],
  );
  const joinProject = useCallback(
    (id: number) => {
      writeJoinProject({
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: 'registerSelfStudent',
        args: [BigInt(id)],
      });
    },
    [writeJoinProject],
  );

  useEffect(() => {
    if (joinStatus === 'success') {
      setJoinDialogActive(false);
    }
  }, [joinStatus]);

  useEffect(() => {
    if (createStatus === 'success') {
      setCreateDialogActive(false);
    }
  }, [createStatus]);

  return (
    <div className="mx-auto flex h-svh w-full max-w-5xl flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => setJoinDialogActive(true)}>
            <Backpack />
            Join
          </Button>
          <Button onClick={() => setCreateDialogActive(true)}>
            <Plus /> Create
          </Button>
        </div>
      </div>
      <div className="h-full">
        <Projects projects={data ?? []} isLoading={loading} />
      </div>
      <div className="mt-auto flex w-full">
        <Button
          className="ml-auto flex max-w-[240px] hover:bg-sidebar-accent"
          variant={'ghost'}
          onClick={() => open()}
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">P</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {accountInfo.embeddedWalletInfo?.user?.username ?? 'Your profile'}
            </span>
            <span className="truncate text-xs">
              {accountInfo.embeddedWalletInfo?.user?.email ??
                accountInfo.address}
            </span>
          </div>
        </Button>
      </div>
      <JoinProjectDialog
        active={joinDialogActive}
        onSubmit={joinProject}
        loading={isJoinPending}
        setActive={setJoinDialogActive}
      />
      <CreateProjectDialog
        active={createDialogActive}
        onSubmit={createProject}
        loading={isCreatePending}
        setActive={setCreateDialogActive}
      />
    </div>
  );
}

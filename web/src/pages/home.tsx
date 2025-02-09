import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { Backpack, Plus } from 'lucide-react';

import Projects from '@/components/projects/projects';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/queries/use-projects';

export default function Home() {
  const { data, isLoading } = useProjects();
  const accountInfo = useAppKitAccount();
  const { open } = useAppKit();

  return (
    <div className="mx-auto flex h-svh w-full max-w-5xl flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="space-x-4">
          <Button variant="outline">
            <Backpack />
            Join
          </Button>
          <Button>
            <Plus /> Create
          </Button>
        </div>
      </div>
      <div className="h-full">
        <Projects projects={data ?? []} isLoading={isLoading} />
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
    </div>
  );
}

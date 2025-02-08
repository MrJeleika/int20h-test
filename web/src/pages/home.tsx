import { Backpack, Plus } from 'lucide-react';

import Projects from '@/components/projects/projects';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/queries/use-projects';

export default function Home() {
  const { data, isLoading } = useProjects();

  return (
    <div className="mx-auto max-w-5xl p-6">
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
      <Projects projects={data ?? []} isLoading={isLoading} />
    </div>
  );
}

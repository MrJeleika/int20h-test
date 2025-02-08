import { BookType, GraduationCap, NotebookPen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProjectNavbar from '@/components/project/project-navbar';
import { routes } from '@/router';

const elements = [
  {
    id: 'info',
    title: 'Information',
    icon: <BookType />,
  },
  {
    id: 'students',
    title: 'Students',
    icon: <GraduationCap />,
  },
  {
    id: 'submissions',
    title: 'Submissions',
    icon: <NotebookPen />,
  },
];

export default function Project() {
  const { id, page } = useParams();

  const [activePage, setActivePage] = useState(elements[0].id);

  const navigate = useNavigate();

  useEffect(() => {
    if (page && elements.some((x) => x.id === page)) {
      setActivePage(page);
    }
  }, [page]);

  useEffect(() => {
    if (activePage !== page) {
      navigate(`${routes.project}/${id}/${activePage}`, { replace: true });
    }
  }, [activePage, page, id, navigate]);

  return (
    <ProjectNavbar
      activeElementId={activePage}
      projectName="Test"
      elements={elements}
      setActivePage={setActivePage}
    >
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </ProjectNavbar>
  );
}

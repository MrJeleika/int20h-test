import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import {
  BookType,
  GraduationCap,
  NotebookPen,
  UserCheck,
  Verified,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProjectNavbar from '@/components/project/project-navbar';
import { routes } from '@/router';
import Information from '@/components/project/sections/information';
import { useProject } from '@/hooks/queries/use-project';
import { useStudents } from '@/hooks/queries/use-students';
import Students from '@/components/project/sections/students';
import AddStudentDialog from '@/components/project/dialogs/add-student-dialog';
import Verifiers from '@/components/project/sections/verifiers';
import AddVerifierDialog from '@/components/project/dialogs/add-verifier-dialog';
import { useVerifiers } from '@/hooks/queries/use-verifiers';

const publicElements = [
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

const verifierElements = [...publicElements];

const ownerElements = [
  ...verifierElements,
  {
    id: 'verifiers',
    title: 'Verifiers',
    icon: <UserCheck />,
  },
];

export default function Project() {
  const { id, page } = useParams();

  const accountInfo = useAppKitAccount();
  const { open } = useAppKit();

  const [isOwner, setIsOwner] = useState(false);
  const [isVerifier, setIsVerifier] = useState(false);
  const elements = useMemo(
    () =>
      isOwner ? ownerElements : isVerifier ? verifierElements : publicElements,
    [isOwner, isVerifier],
  );

  const [activePage, setActivePage] = useState(elements[0].id);

  const [addStudentModalActive, setAddStudentModalActive] = useState(false);
  const [addVerifierModalActive, setAddVerifierModalActive] = useState(false);

  const navigate = useNavigate();

  const { data: project, isLoading: projectLoading } = useProject();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: verifiers, isLoading: verifiersLoading } = useVerifiers();

  useEffect(() => {
    if (page && elements.some((x) => x.id === page)) {
      setActivePage(page);
    }
  }, [page, elements]);

  useEffect(() => {
    // MOCK
    setIsOwner(true);
    setIsVerifier(true);
  }, []);

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
      accountInfo={accountInfo}
      openProfile={open}
    >
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        {activePage === 'info' && (
          <Information projectData={project} loading={projectLoading} />
        )}
        {activePage === 'students' && (
          <>
            <Students
              students={students ?? []}
              loading={studentsLoading}
              isOwner={isOwner}
              setAddStudentsDialogActive={setAddStudentModalActive}
            />
            <AddStudentDialog
              active={addStudentModalActive}
              setActive={setAddStudentModalActive}
              loading={false}
              onSubmit={() => console.warn('MOCK')}
            />
          </>
        )}
        {activePage === 'verifiers' && (
          <>
            <Verifiers
              verifiers={verifiers ?? []}
              loading={verifiersLoading}
              isOwner={isOwner}
              setAddVerifierDialogActive={setAddVerifierModalActive}
            />
            <AddVerifierDialog
              active={addVerifierModalActive}
              setActive={setAddVerifierModalActive}
              loading={false}
              onSubmit={() => console.warn('MOCK')}
            />
          </>
        )}
      </div>
    </ProjectNavbar>
  );
}

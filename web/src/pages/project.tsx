import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { BookType, GraduationCap, NotebookPen, UserCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AddStudentDialog from '@/components/project/dialogs/add-student-dialog';
import AddVerifierDialog from '@/components/project/dialogs/add-verifier-dialog';
import SubmitAchievementDialog from '@/components/project/dialogs/submit-achievement-dialog';
import ProjectNavbar from '@/components/project/project-navbar';
import Achievements from '@/components/project/sections/achievments';
import Information from '@/components/project/sections/information';
import MyAchievements from '@/components/project/sections/my-achievments';
import Students from '@/components/project/sections/students';
import Verifiers from '@/components/project/sections/verifiers';
import { useAchievements } from '@/hooks/queries/use-achievements';
import { useProject } from '@/hooks/queries/use-project';
import { useStudents } from '@/hooks/queries/use-students';
import { useVerifiers } from '@/hooks/queries/use-verifiers';
import { routes } from '@/router';

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
];

const studentElements = [
  ...publicElements,
  {
    id: 'my-achievements',
    title: 'My Achievements',
    icon: <NotebookPen />,
  },
];

const verifierElements = [
  ...publicElements,
  {
    id: 'achievements',
    title: 'Achievements',
    icon: <NotebookPen />,
  },
];

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
      isOwner ? ownerElements : isVerifier ? verifierElements : studentElements,
    [isOwner, isVerifier],
  );

  const [activePage, setActivePage] = useState(elements[0].id);

  const [addStudentModalActive, setAddStudentModalActive] = useState(false);
  const [addVerifierModalActive, setAddVerifierModalActive] = useState(false);
  const [addAchievementModalActive, setAddAchievementModalActive] =
    useState(false);

  const navigate = useNavigate();

  const { data: project, isLoading: projectLoading } = useProject();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: verifiers, isLoading: verifiersLoading } = useVerifiers();
  const { data: achievements, isLoading: achievementsLoading } =
    useAchievements();

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
        {activePage === 'achievements' && (
          <>
            <Achievements
              achievements={achievements ?? []}
              loading={achievementsLoading}
              verify={(id) => console.warn('MOCK', id)}
            ></Achievements>
          </>
        )}
        {activePage === 'my-achievements' && (
          <>
            <MyAchievements
              achievements={
                achievements?.filter(
                  (x) => x.student === accountInfo.address,
                ) ?? []
              }
              loading={achievementsLoading}
              setSubmitAchievementDialog={setAddAchievementModalActive}
            ></MyAchievements>
            <SubmitAchievementDialog
              active={addAchievementModalActive}
              setActive={setAddAchievementModalActive}
              loading={false}
              onSubmit={(desc) => console.warn('MOCK', desc)}
            />
          </>
        )}
      </div>
    </ProjectNavbar>
  );
}

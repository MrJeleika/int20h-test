import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { BookType, GraduationCap, NotebookPen, UserCheck } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWriteContract } from 'wagmi';

import AddStudentDialog from '@/components/project/dialogs/add-student-dialog';
import AddVerifierDialog from '@/components/project/dialogs/add-verifier-dialog';
import SubmitAchievementDialog from '@/components/project/dialogs/submit-achievement-dialog';
import ProjectNavbar from '@/components/project/project-navbar';
import Achievements from '@/components/project/sections/achievments';
import Information from '@/components/project/sections/information';
import MyAchievements from '@/components/project/sections/my-achievments';
import Students from '@/components/project/sections/students';
import Verifiers from '@/components/project/sections/verifiers';
import {
  useAchievements,
  useMyAchievements,
} from '@/hooks/queries/use-achievements';
import { useProject } from '@/hooks/queries/use-project';
import { useStudents } from '@/hooks/queries/use-students';
import { useVerifiers } from '@/hooks/queries/use-verifiers';
import abi from '@/lib/contractAbi';
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

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ID;

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

  const {
    data: project,
    isLoading: projectLoading,
    refetch: refetchProject,
  } = useProject(accountInfo.address, Number(id));
  const {
    data: students,
    isLoading: studentsLoading,
    refetch: refetchStudents,
  } = useStudents(accountInfo.address, Number(id));
  const {
    data: verifiers,
    isLoading: verifiersLoading,
    refetch: refetchVerifiers,
  } = useVerifiers(accountInfo.address, Number(id));
  const {
    data: achievements,
    isLoading: achievementsLoading,
    refetch: refetchAchievements,
  } = useAchievements(accountInfo.address, Number(id));
  const {
    data: myAchievements,
    isLoading: myAchievementsLoading,
    refetch: refetchMyAchievements,
  } = useMyAchievements(accountInfo.address, Number(id));

  const {
    writeContractAsync: writePostAchievement,
    isPending: isPostAchievementPending,
    status: postAchievementStatus,
  } = useWriteContract();

  const postAchievement = useCallback(
    async (description: string) => {
      await writePostAchievement({
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: 'postAchievement',
        args: [BigInt(id ?? -1), description],
      });
    },
    [writePostAchievement, id],
  );

  useEffect(() => {
    if (postAchievementStatus === 'success') {
      refetchMyAchievements();
      setAddAchievementModalActive(false);
    }
  }, [postAchievementStatus, refetchMyAchievements]);

  const {
    writeContractAsync: writeVerifyAchievement,
    status: verifyAchievementStatus,
  } = useWriteContract();

  const verifyAchievement = useCallback(
    async (achievementId: number) => {
      await writeVerifyAchievement({
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: 'verify',
        args: [BigInt(id ?? -1), BigInt(achievementId)],
      });
    },
    [writeVerifyAchievement, id],
  );

  useEffect(() => {
    if (verifyAchievementStatus === 'success') {
      refetchAchievements();
    }
  }, [verifyAchievementStatus, refetchAchievements]);

  const {
    writeContractAsync: writeAddVerifier,
    status: addVerifierStatus,
    isPending: isAddVerifierPending,
  } = useWriteContract();

  const addVerifier = useCallback(
    async (address: string) => {
      await writeAddVerifier({
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: 'addVerifierToProject',
        args: [BigInt(id ?? -1), address as `0x${string}`],
      });
    },
    [writeAddVerifier, id],
  );

  useEffect(() => {
    if (addVerifierStatus === 'success') {
      refetchVerifiers();
      setAddVerifierModalActive(false);
    }
  }, [addVerifierStatus, refetchVerifiers]);

  const {
    writeContractAsync: writeAddStudent,
    status: addStudentStatus,
    isPending: isAddStudentPending,
  } = useWriteContract();

  const addStudent = useCallback(
    async (address: string) => {
      await writeAddStudent({
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: 'addStudentToProjectWhitelist',
        args: [BigInt(id ?? -1), address as `0x${string}`],
      });
    },
    [writeAddStudent, id],
  );

  useEffect(() => {
    if (addStudentStatus === 'success') {
      refetchStudents();
      setAddStudentModalActive(false);
    }
  }, [addStudentStatus, refetchStudents]);

  const { status: endProjectStatus, writeContractAsync: writeEndProject } =
    useWriteContract();

  const endProject = useCallback(async () => {
    await writeEndProject({
      abi: abi,
      address: CONTRACT_ADDRESS,
      functionName: 'endProject',
      args: [BigInt(id ?? -1)],
    });
  }, [writeEndProject, id]);

  useEffect(() => {
    if (endProjectStatus === 'success') {
      refetchProject();
    }
  }, [endProjectStatus, refetchProject]);

  useEffect(() => {
    if (page && elements.some((x) => x.id === page)) {
      setActivePage(page);
    }
  }, [page, elements]);

  useEffect(() => {
    if (!project && !projectLoading) {
      navigate(routes.root);
    }
  }, [project, projectLoading, navigate]);

  useEffect(() => {
    if (project?.owner) {
      setIsOwner(project.owner === accountInfo.address);
      setIsVerifier(
        verifiers?.includes(accountInfo.address as `0x${string}`) ?? false,
      );
    }
  }, [project?.owner, accountInfo.address, verifiers]);

  useEffect(() => {
    if (activePage !== page) {
      navigate(`${routes.project}/${id}/${activePage}`, { replace: true });
    }
  }, [activePage, page, id, navigate]);

  const deadlinePassed = project ? project.endDate < new Date() : false;

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
          <Information
            deadlinePassed={deadlinePassed}
            isOwner={isOwner}
            projectData={project}
            loading={projectLoading}
            endProject={endProject}
          />
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
              loading={isAddStudentPending}
              onSubmit={addStudent}
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
              loading={isAddVerifierPending}
              onSubmit={addVerifier}
            />
          </>
        )}
        {activePage === 'achievements' && (
          <>
            <Achievements
              achievements={achievements ?? []}
              loading={achievementsLoading}
              requiredVerifications={project?.requiredVerifications ?? 1}
              verify={verifyAchievement}
            ></Achievements>
          </>
        )}
        {activePage === 'my-achievements' && (
          <>
            <MyAchievements
              achievements={myAchievements ?? []}
              loading={myAchievementsLoading}
              setSubmitAchievementDialog={setAddAchievementModalActive}
              deadlinePassed={deadlinePassed}
            ></MyAchievements>
            <SubmitAchievementDialog
              active={addAchievementModalActive}
              setActive={setAddAchievementModalActive}
              loading={isPostAchievementPending}
              onSubmit={postAchievement}
            />
          </>
        )}
      </div>
    </ProjectNavbar>
  );
}

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deployment } from './deployment';
import { ethers } from 'hardhat';

describe('Example', () => {
  it('deployment', async () => {
    const { main, user, owner } = await loadFixture(deployment);
    const address = await main.getAddress();
    expect(address).to.be.properAddress;
  });

  it('project is created by owner and successfully retrieved with getAllProjects()', async () => {
    const { main, user, owner } = await loadFixture(deployment);

    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    const projects = await main.getAllProjects();

    expect(projects.length).to.equal(1);
  });

  it('project is created by owner and received with getMyOwnedProjects()', async () => {
    const { main, user, owner } = await loadFixture(deployment);

    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    const ownedProjects = await main.getMyOwnedProjects();

    expect(ownedProjects.length).to.equal(1);
  });

  it('project is created by owner and received by another user with getAllProjects()', async () => {
    const { main, user, owner } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    const userRunner = main.connect(user);
    const projects = await userRunner.getAllProjects();

    expect(projects.length).to.equal(1);
  });

  it('public project is created by owner and participated by another user with registerSelfStudent()', async () => {
    const { main, user, owner } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });
    await main.createProject('Project1', 'Description1', 1231234124125, true, { value: ethers.parseEther("1") });

    const userRunner = main.connect(user);

    await userRunner.registerSelfStudent(1);

    const participatedProjects = await userRunner.getMyParticipatedProjects();

    expect(participatedProjects.length).to.equal(1);
    expect(participatedProjects[0].projectId).to.equal(1);
  });

  it('private project is created by owner and it cannot be participated by other user with registerSelfStudent()', async () => {
    const { main, user, owner } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });
    await main.createProject('Project1', 'Description1', 1231234124125, false, { value: ethers.parseEther("1") });

    const userRunner = main.connect(user);

    const participatedProjects = await userRunner.getMyParticipatedProjects();

    expect(async () => await userRunner.registerSelfStudent(1)).to.revertedWith(
      'You don`t have permission or you must be added by project owner to the whitelist.',
    );
  });

  it('owners cannot participate their projects with registerSelfStudent or addToWhitelist', async () => {
    const { main, user, owner } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });
    await main.createProject('Project1', 'Description1', 1231234124125, true, { value: ethers.parseEther("1") });

    expect(async () => await main.registerSelfStudent(0)).to.revertedWith(
      'You are the project owner',
    );

    expect(
      async () => await main.addStudentToProjectWhitelist(1, owner.address),
    ).to.revertedWith('You are the project owner');
  });

  it('owner can add a verifier to a project and after that verifier can receive the projects where he is the verifier', async () => {
    const { main, user, owner, user1 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });
    await main.createProject('Project1', 'Description1', 1231234124125, true, { value: ethers.parseEther("1") });

    await main.addVerifierToProject(0, user1.address);

    const verifierRunner = main.connect(user1);

    const verificationProjects =
      await verifierRunner.getMyVerificationProjects();

    expect(verificationProjects.length).to.eq(1);
  });

  it('owner cannot add a duplicate verifier to a project ', async () => {
    const { main, user, owner, user1 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });
    await main.createProject('Project1', 'Description1', 1231234124125, true, { value: ethers.parseEther("1") });

    await main.addVerifierToProject(0, user1.address);

    expect(
      async () => await main.addVerifierToProject(0, user1.address),
    ).to.revertedWith(
      'Verifier with such address for this project already exists.',
    );
  });

  it('non-owner cannot add a verifier to a project', async () => {
    const { main, user, owner, user1 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });
    await main.createProject('Project1', 'Description1', 1231234124125, true, { value: ethers.parseEther("1") });

    const userRunner = main.connect(user);

    expect(
      async () => await userRunner.addVerifierToProject(0, user1.address),
    ).to.revertedWith('Not the project owner');
  });

  it('user can get verifiers of the project', async () => {
    const { main, user, owner, user1 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    await main.addVerifierToProject(0, user.address);

    const verifiers = await main.getProjectVerifiers(0);
    expect(verifiers.length).to.be.equals(1);
  });

  it('owner cannot post an achievement', async () => {
    const { main, user, owner, user1, user2 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    expect(async () => await main.postAchievement(0, 'qq')).to.revertedWith(
      'You are not the student for this project.',
    );
  });

  it('student can post an achievement and receive his achievements', async () => {
    const { main, user, owner, user1, user2 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    const userRunner = main.connect(user);

    await userRunner.registerSelfStudent(0);

    await userRunner.postAchievement(0, 'qq');
    await userRunner.postAchievement(0, 'qq1');

    const achievements = await userRunner.getAllMyAchievementsForStudent();
    expect(achievements.length).to.eq(2);
  });

  it('owner can add students to private project whitelist and they can then postAchievements', async () => {
    const { main, user, owner } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, false, { value: ethers.parseEther("1") });
    await main.addStudentToProjectWhitelist(0, user.address);

    const userRunner = main.connect(user);

    await userRunner.postAchievement(0, 'qq');
    await userRunner.postAchievement(0, 'qq1');

    const achievements = await userRunner.getAllMyAchievementsForStudent();

    expect(achievements.length).to.eq(2);
  });

  it('verifiers can verify a project achievement', async () => {
    const { main, user, owner, user1, user2 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    await main.addVerifierToProject(0, user1.address);
    await main.addVerifierToProject(0, user2.address);

    const userRunner = main.connect(user);

    await userRunner.registerSelfStudent(0);

    await userRunner.postAchievement(0, 'qq');

    const verifierRunner = main.connect(user2);

    const pendingAchievements =
      await verifierRunner.getUnverifiedAchievementsForVerifier(0);

    expect(pendingAchievements.length).to.eq(1);

    await verifierRunner.verify(
      pendingAchievements[0].projectId,
      pendingAchievements[0].achievementId,
    );

    const newPendingAchievements =
      await verifierRunner.getUnverifiedAchievementsForVerifier(0);

    const verifiedAchievements =
      await verifierRunner.getVerifiedAchievementsForVerifier(0);

    expect(newPendingAchievements.length).to.eq(0);
    expect(verifiedAchievements.length).to.eq(1);
  });

  it('user can get correct amount of verified student achievements', async () => {
    const { main, user, owner, user1, user2 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    const userRunner = main.connect(user);

    await userRunner.registerSelfStudent(0);

    await userRunner.postAchievement(0, 'qq');

    const secondUserRunner = main.connect(user1);
    await secondUserRunner.registerSelfStudent(0);
    await secondUserRunner.postAchievement(0, 'qq1');

    await main.verify(0, 0);

    const students = await main.getProjectStudents(0);

    expect(students[0].achievements).to.eq(1);
    expect(students[1].achievements).to.eq(0);
  });

  it('anyone can get achievement by id', async () => {
    const { main, user, owner, user1, user2 } = await loadFixture(deployment);
    await main.createProject('Project', 'Description', 1231234124124, true, { value: ethers.parseEther("1") });

    const userRunner = main.connect(user);

    await userRunner.registerSelfStudent(0);

    await userRunner.postAchievement(0, 'qq');

    const achievement = await userRunner.getAchievementById(0);

    console.log(achievement);
  });
});

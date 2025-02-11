import { deployments, ethers } from 'hardhat';

export const deployment = async () => {
  const [owner, user, user1, user2] = await ethers.getSigners();
  const main = await ethers.deployContract('Main', owner);

  return {
    owner,
    main,
    user,
    user1,
    user2,
  };
};

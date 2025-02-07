import { ethers } from 'hardhat';

export const skipTimeDays = async (days: number) => {
  const time = days * 24 * 60 * 60;

  await ethers.provider.send('evm_increaseTime', [time]);
  await ethers.provider.send('evm_mine');
};

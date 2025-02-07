import { deployments, ethers, getNamedAccounts, upgrades } from 'hardhat';
import { abi as TransparentUpgradeableProxyABI } from '@openzeppelin/contracts/build/contracts/TransparentUpgradeableProxy.json';

async function main() {
  const Lock = await ethers.getContractFactory('Lock');
  const lock = await upgrades.deployProxy(Lock, ['0x0'], {
    unsafeAllow: ['constructor'],
  });

  await lock.waitForDeployment();
  console.log('Box deployed to:', await lock.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

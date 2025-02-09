import { deployments, ethers, getNamedAccounts, upgrades } from 'hardhat';
import { abi as TransparentUpgradeableProxyABI } from '@openzeppelin/contracts/build/contracts/TransparentUpgradeableProxy.json';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    'Deploying contracts with the account: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    deployer.address,
  );
  const main = await deployments.deploy('Main', {
    from: deployer.address,
  });

  //await main.waitForDeployment();
  console.log('Box deployed to:', main.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

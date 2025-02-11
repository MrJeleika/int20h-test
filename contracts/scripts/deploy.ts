import { deployments, ethers } from 'hardhat';

async function main() {
  const signers = await ethers.getSigners();
  console.log('SIGNER', signers[0]);
  const main = await deployments.deploy('Main', {
    from: signers[0].address,
  });

  console.log('Box deployed to:', main.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

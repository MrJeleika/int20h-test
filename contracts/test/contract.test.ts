import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deployment } from './helpers-staking/Test.deployment.test';
describe('CCCStaking', () => {
  it.only('deployment', async () => {
    const { token } = await loadFixture(deployment);

    expect(await token.getAddress()).to.be.properAddress;
  });
});

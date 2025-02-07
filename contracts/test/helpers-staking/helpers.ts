import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { CCCStaking, ERC20Default } from '../../typechain-types';
import { parseUnits } from 'ethers';
import { expect } from 'chai';

export const deposit = async (
  staking: CCCStaking,
  token: ERC20Default,
  caller: SignerWithAddress,
  amount: number,
  poolId: number = 1,
  revertedWith?: string,
) => {
  const amountDec = parseUnits(amount.toString(), 18);
  await token.approve(await staking.getAddress(), BigInt(amountDec));

  if (revertedWith) {
    await expect(
      staking.connect(caller).deposit(BigInt(amountDec), poolId),
    ).to.be.rejectedWith(revertedWith);
    return;
  }

  const balanceBefore = await token.balanceOf(caller.address);

  await staking.connect(caller).deposit(BigInt(amountDec), poolId);
  const balanceAfter = await token.balanceOf(caller.address);

  expect(balanceBefore - balanceAfter).to.equal(amountDec);
};

export const withdraw = async (
  staking: CCCStaking,
  token: ERC20Default,
  caller: SignerWithAddress,
  ids: number[],
  poolId: number = 1,
  revertedWith?: string,
) => {
  if (revertedWith) {
    await expect(
      staking.connect(caller).withdraw(poolId, ids),
    ).to.be.rejectedWith(revertedWith);
    return;
  }

  const balanceBefore = await token.balanceOf(caller.address);

  await staking.connect(caller).withdraw(poolId, ids);
  const balanceAfter = await token.balanceOf(caller.address);

  expect(balanceAfter).gt(balanceBefore);
};

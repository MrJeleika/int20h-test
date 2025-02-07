import { ethers } from 'hardhat';

import {
  // eslint-disable-next-line camelcase
  ERC20Default__factory,
} from '../../typechain-types';
import { parseUnits } from 'ethers';

export const deployment = async () => {
  const [signer, user] = await ethers.getSigners();
  const token = await new ERC20Default__factory(signer).deploy();

  return {
    owner: signer,
    token,
    user,
  };
};

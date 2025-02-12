import { HardhatNetworkUserConfig, NetworkUserConfig } from 'hardhat/types';

import { GWEI } from '../constants';
import { ENV } from '../env';
import { ConfigPerNetwork, Network, RpcUrl } from '../types';

const { ALCHEMY_KEY, INFURA_KEY, MNEMONIC_DEV, MNEMONIC_PROD, PK } = ENV;

export const rpcUrls: ConfigPerNetwork<RpcUrl> = {
  main: ALCHEMY_KEY
    ? `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
    : `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  goerli: ALCHEMY_KEY
    ? `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`
    : `https://goerli.infura.io/v3/${INFURA_KEY}`,
  hardhat: 'http://localhost:8545',
  localhost: 'http://localhost:8545',
  optimism: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
  base: `https://base-mainnet.infura.io/v3/${INFURA_KEY}`,
  sepolia: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`,
};

export const gasPrices: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: undefined,
  hardhat: undefined,
  localhost: 70 * GWEI,
  optimism: undefined,
  base: undefined,
  sepolia: 70 * GWEI,
};

export const chainIds: ConfigPerNetwork<number> = {
  main: 1,
  goerli: 5,
  hardhat: 31337,
  localhost: 31337,
  optimism: 10,
  base: 8453,
  sepolia: 11155111,
};

export const mnemonics: ConfigPerNetwork<string | undefined> = {
  main: MNEMONIC_PROD,
  goerli: MNEMONIC_DEV,
  hardhat: MNEMONIC_DEV,
  localhost: MNEMONIC_DEV,
  optimism: MNEMONIC_PROD,
  base: MNEMONIC_PROD,
  sepolia: MNEMONIC_DEV,
};

export const gases: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: 1_250_000,
  sepolia: 1_250_000,
  hardhat: undefined,
  localhost: 1_250_000,
  optimism: undefined,
  base: undefined,
};

export const timeouts: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: 999999,
  sepolia: 999999,
  hardhat: undefined,
  localhost: 999999,
  optimism: undefined,
  base: undefined,
};

export const blockGasLimits: ConfigPerNetwork<number | undefined> = {
  main: 300 * 10 ** 6,
  goerli: undefined,
  hardhat: 300 * 10 ** 6,
  localhost: undefined,
  optimism: undefined,
  sepolia: 3000 * 10 ** 6,
  base: undefined,
};

export const blockNumbers: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: undefined,
  hardhat: undefined,
  localhost: undefined,
  sepolia: 7601164,
  optimism: 126759240,
  base: 21201300,
};

export const initialBasesFeePerGas: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: undefined,
  hardhat: 0,
  localhost: undefined,
  optimism: undefined,
  sepolia: 500,
  base: undefined,
};

export const getBaseNetworkConfig = (network: Network): NetworkUserConfig => ({
  chainId: chainIds[network],
  gas: gases[network],
  gasPrice: gasPrices[network],
  blockGasLimit: blockGasLimits[network],
  timeout: timeouts[network],
  initialBaseFeePerGas: initialBasesFeePerGas[network],
});

export const getNetworkConfig = (network: Network): NetworkUserConfig => ({
  ...getBaseNetworkConfig(network),
  url: rpcUrls[network],
  saveDeployments: true,
  accounts: [MNEMONIC_DEV!],
});

export const getForkNetworkConfig = (
  network: Network,
): HardhatNetworkUserConfig => {
  return {
    ...getBaseNetworkConfig(network),
    accounts: {
      mnemonic: mnemonics[network],
    },

    chainId: chainIds.hardhat,
    live: false,
    saveDeployments: true,
    forking: {
      enabled: true,
      url: rpcUrls[network],
      blockNumber: blockNumbers[network],
    },
  };
};

export const getHardhatNetworkConfig = (): HardhatNetworkUserConfig => ({
  ...getBaseNetworkConfig('hardhat'),
  accounts: mnemonics.hardhat ? { mnemonic: mnemonics.hardhat } : undefined,
  saveDeployments: true,
  live: false,
});

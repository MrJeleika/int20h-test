import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-verify';
import '@openzeppelin/hardhat-upgrades';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import 'hardhat-docgen';
// import './tasks';

import {
  ENV,
  getForkNetworkConfig,
  getHardhatNetworkConfig,
  getNetworkConfig,
} from './config';
const { OPTIMIZER, REPORT_GAS, FORKING_NETWORK, ETHERSCAN_API_KEY } = ENV;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: '0x09d62F0382783416E8D78c61585Ae2A2D3260f95',
  },

  networks: {
    main: getNetworkConfig('main'),
    goerli: getNetworkConfig('goerli'),
    optimism: getNetworkConfig('optimism'),
    base: getNetworkConfig('base'),
    sepolia: getNetworkConfig('sepolia'),
    hardhat: FORKING_NETWORK
      ? getForkNetworkConfig(FORKING_NETWORK)
      : getHardhatNetworkConfig(),
    localhost: FORKING_NETWORK
      ? getForkNetworkConfig(FORKING_NETWORK)
      : getHardhatNetworkConfig(),
  },
  gasReporter: {
    enabled: REPORT_GAS,
  },
  contractSizer: {
    runOnCompile: OPTIMIZER,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    deploy: 'deploy/',
    deployments: 'deployments/',
    sources: 'contracts/',
  },
  docgen: {
    path: './docgen',
    clear: true,
    runOnCompile: false,
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
  external: FORKING_NETWORK
    ? {
        deployments: {
          hardhat: ['deployments/' + FORKING_NETWORK],
          local: ['deployments/' + FORKING_NETWORK],
        },
      }
    : undefined,
};

export default config;

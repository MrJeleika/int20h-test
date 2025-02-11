import type { Chain } from '@reown/appkit/networks';
import { localhost, sepolia, hardhat } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// 1. Get projectId from https://cloud.reown.com
const projectId = '3cbd4e74c138358d2d9c8b63e8f5a956';

type NetworkNames = 'localhost' | 'sepolia' | 'hardhat';

const envNetworks = {
  localhost,
  sepolia,
  hardhat,
};

// 2. Create a metadata object - optional
const metadata = {
  name: 'StudentWilby',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png'],
};

// 3. Set the networks
const env = import.meta.env.VITE_NETWORK as NetworkNames;
const networks = [envNetworks[env]] satisfies [Chain, ...Chain[]];

// 4. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

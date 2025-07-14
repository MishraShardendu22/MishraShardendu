import { ReactNode } from "react";
import { mainnet, sepolia, Chain } from "wagmi/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const hardhat: Chain & { network: string } = {
  id: 31337,
  name: "Hardhat",
  network: "hardhat",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [import.meta.env.VITE_RPC_URL] },
    public: { http: [import.meta.env.VITE_RPC_URL] },
  },
};


const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, sepolia, hardhat],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://rpc.ankr.com/eth/9815006e2dbfbcc89648b629d222cc0a082815bbf52da5a2570b9db44208a1a9`,
      ),
      [sepolia.id]: http(
        `https://rpc.ankr.com/eth_sepolia/9815006e2dbfbcc89648b629d222cc0a082815bbf52da5a2570b9db44208a1a9`,
      ),
      [hardhat.id]: http(import.meta.env.VITE_RPC_URL), 
    },

    // Required API Keys
    walletConnectProjectId: '6060ffa99c934c70785030b9780dc9b2',

    // Required App Info
    appName: "Ticketer",

    // Optional App Info
    // appDescription: "Your App Description",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider options={{hideBalance: false}}>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
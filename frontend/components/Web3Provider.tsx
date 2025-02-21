'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize QueryClient
const queryClient = new QueryClient();

const { chains, publicClient } = configureChains(
  [arbitrumSepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Utilize',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: '#00A3E0',
            borderRadius: 'medium',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
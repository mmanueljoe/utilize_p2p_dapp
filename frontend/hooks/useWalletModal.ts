'use client';

import { create } from 'zustand';

interface WalletModalStore {
  isOpen: boolean;
  message: string;
  openModal: (message?: string) => void;
  closeModal: () => void;
}

export const useWalletModal = create<WalletModalStore>((set) => ({
  isOpen: false,
  message: 'Please connect your wallet to continue',
  openModal: (message) => set({ isOpen: true, message: message || 'Please connect your wallet to continue' }),
  closeModal: () => set({ isOpen: false }),
}));
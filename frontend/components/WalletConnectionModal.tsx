'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export function WalletConnectionModal({ isOpen, onClose, message = 'Please connect your wallet to continue' }: WalletConnectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A1A1A] p-6 rounded-lg shadow-xl w-full max-w-md border border-white/10"
          >
            <div className="flex items-center justify-center mb-4">
              <Wallet className="text-[#00A3E0] w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-4">Connect Wallet</h2>
            <p className="text-gray-400 text-center mb-6">{message}</p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
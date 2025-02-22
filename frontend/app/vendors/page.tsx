'use client';

import { motion } from 'framer-motion';
import { Plus, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import { VendorForm } from '@/components/VendorForm';
import { useUtilize } from '@/hooks/useUtilize';
import { useWalletModal } from '@/hooks/useWalletModal';
import { WalletConnectionModal } from '@/components/WalletConnectionModal';

export default function VendorsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { address } = useUtilize();
  const { isOpen, message, openModal, closeModal } = useWalletModal();

  const handleCreateClick = () => {
    if (!address) {
      openModal('Please connect your wallet to create a listing');
      return;
    }
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white"
        >
          Vendor Dashboard
        </motion.h1>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0088BD] transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create Listing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1A1A1A] p-6 rounded-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Active Listings</h3>
            <Shield className="text-[#00A3E0] h-8 w-8" />
          </div>
          <p className="text-3xl font-bold text-white">3</p>
          <p className="text-gray-400">Currently active utility listings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A] p-6 rounded-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Total Revenue</h3>
            <Star className="text-[#00A3E0] h-8 w-8" />
          </div>
          <p className="text-3xl font-bold text-white">2.5 ETH</p>
          <p className="text-gray-400">≈ $4,500 USD</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A1A1A] p-6 rounded-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Reputation Score</h3>
            <Star className="text-yellow-400 h-8 w-8" />
          </div>
          <p className="text-3xl font-bold text-white">4.9/5.0</p>
          <p className="text-gray-400">Based on 128 transactions</p>
        </motion.div>
      </div>

      {isFormOpen && <VendorForm onClose={() => setIsFormOpen(false)} />}
      
      <WalletConnectionModal
        isOpen={isOpen}
        onClose={closeModal}
        message={message}
      />
    </div>
  );
}
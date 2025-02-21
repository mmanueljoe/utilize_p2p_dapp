'use client';

import { Star, Zap, Wifi, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useUtilize } from '@/hooks/useUtilize';
import { formatEther } from 'ethers/lib/utils';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const UtilityCard = ({ 
  id,
  title, 
  price, 
  rating, 
  type, 
  seller 
}: { 
  id: number;
  title: string;
  price: string;
  rating: number;
  type: string;
  seller: string;
}) => {
  const { payForUtility, isPaying, address } = useUtilize();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      await payForUtility(id, formatEther(price));
      alert('Payment successful!');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      className="bg-[#1A1A1A] rounded-xl p-6 hover:shadow-[0_0_30px_rgba(0,163,224,0.15)] transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400">{seller}</p>
        </div>
        {type === 'electricity' && <Zap className="text-[#00A3E0]" size={24} />}
        {type === 'internet' && <Wifi className="text-[#00A3E0]" size={24} />}
        {type === 'water' && <Droplet className="text-[#00A3E0]" size={24} />}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-400" size={16} fill="currentColor" />
          <span className="text-white">{rating}/5</span>
        </div>
        <div className="text-right">
          <p className="text-[#00A3E0] font-semibold">{formatEther(price)} ETH</p>
          <p className="text-sm text-gray-400">≈ $150/month</p>
        </div>
      </div>
      <button 
        className={`w-full mt-4 bg-[#00A3E0] text-white py-2 rounded-lg transition-colors ${
          isProcessing || isPaying 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-[#0088BD]'
        }`}
        onClick={handlePayment}
        disabled={isProcessing || isPaying}
      >
        {isProcessing || isPaying ? 'Processing...' : 'Pay Now'}
      </button>
    </motion.div>
  );
};
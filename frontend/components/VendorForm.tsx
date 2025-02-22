'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUtilize } from '@/hooks/useUtilize';
import { useWalletModal } from '@/hooks/useWalletModal';

const vendorFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  utilityType: z.enum(['electricity', 'internet', 'water', 'gas']),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Price must be greater than 0',
  }),
});

type VendorFormData = z.infer<typeof vendorFormSchema>;

interface VendorFormProps {
  onClose: () => void;
}

export function VendorForm({ onClose }: VendorFormProps) {
  const { createListing, isCreating, address } = useUtilize();
  const { openModal } = useWalletModal();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      utilityType: 'electricity',
    },
  });

  const onSubmit = async (data: VendorFormData) => {
    if (!address) {
      openModal('Please connect your wallet to create a listing');
      return;
    }

    try {
      await createListing(data.title, data.utilityType, data.price);
      setIsSuccess(true);
      setTimeout(() => {
        reset();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#1A1A1A] p-6 rounded-lg shadow-xl w-full max-w-md border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Listing</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Title
            </label>
            <input
              {...register('title')}
              className="w-full bg-[#252525] text-white px-4 py-2 rounded-lg border border-white/10 focus:border-[#00A3E0] focus:outline-none"
              placeholder="e.g., Starlink Premium Subscription"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Utility Type
            </label>
            <select
              {...register('utilityType')}
              className="w-full bg-[#252525] text-white px-4 py-2 rounded-lg border border-white/10 focus:border-[#00A3E0] focus:outline-none"
            >
              <option value="electricity">Electricity</option>
              <option value="internet">Internet</option>
              <option value="water">Water</option>
              <option value="gas">Gas</option>
            </select>
            {errors.utilityType && (
              <p className="mt-1 text-sm text-red-500">{errors.utilityType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Price (ETH)
            </label>
            <input
              {...register('price')}
              type="number"
              step="0.001"
              className="w-full bg-[#252525] text-white px-4 py-2 rounded-lg border border-white/10 focus:border-[#00A3E0] focus:outline-none"
              placeholder="0.05"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 text-white bg-[#252525] rounded-lg hover:bg-[#303030] transition-colors"
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 bg-[#00A3E0] text-white rounded-lg hover:bg-[#0088BD] transition-colors flex items-center"
            >
              {isCreating ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Creating...
                </>
              ) : (
                'Create Listing'
              )}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A] rounded-lg"
            >
              <div className="text-center">
                <div className="text-[#00A3E0] text-4xl mb-4">✓</div>
                <p className="text-white font-semibold">Listing created successfully!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { UtilityCard } from '@/components/UtilityCard';

export default function Marketplace() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-8">Utility Marketplace</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search utilities..."
              className="w-full bg-[#1A1A1A] text-white pl-10 pr-4 py-2 rounded-lg border border-white/10 focus:border-[#00A3E0] focus:outline-none"
            />
          </div>
          <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg border border-white/10 hover:bg-[#252525] transition-colors flex items-center gap-2">
            <Filter size={20} />
            Filters
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['All', 'Electricity', 'Internet', 'Water', 'Gas'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg border border-white/10 hover:bg-[#252525] transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UtilityCard
            title="Starlink Premium"
            seller="Starlink Official"
            price="0.05 ETH/month"
            rating={4.9}
            type="internet"
          />
          <UtilityCard
            title="ComEd Electricity"
            seller="Alex Thompson"
            price="0.02 ETH/month"
            rating={4.8}
            type="electricity"
          />
          <UtilityCard
            title="City Water Service"
            seller="Water Authority"
            price="0.015 ETH/month"
            rating={4.7}
            type="water"
          />
          {/* Add more cards as needed */}
        </div>
      </motion.div>
    </div>
  );
}
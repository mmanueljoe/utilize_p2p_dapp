'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FiltersState {
  minPrice: string;
  maxPrice: string;
  type: string;
}

interface MarketplaceFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FiltersState) => void;
}

export function MarketplaceFilters({ onSearch, onFilter }: MarketplaceFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FiltersState>({
    minPrice: '',
    maxPrice: '',
    type: 'all'
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search utilities..."
            className="w-full bg-[#1A1A1A] text-white pl-10 pr-4 py-3 rounded-lg border border-white/10 focus:border-[#00A3E0] focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="px-4 py-3 bg-[#1A1A1A] text-white rounded-lg border border-white/10 hover:bg-[#252525] transition-colors flex items-center gap-2"
        >
          {isFiltersOpen ? <X size={20} /> : <Filter size={20} />}
          Filters
        </button>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#1A1A1A] p-6 rounded-lg border border-white/10 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Min Price (ETH)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full bg-[#252525] text-white px-4 py-2 rounded-lg border border-white/10 focus:border-[#00A3E0] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Max Price (ETH)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full bg-[#252525] text-white px-4 py-2 rounded-lg border border-white/10 focus:border-[#00A3E0] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Utility Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full bg-[#252525] text-white px-4 py-2 rounded-lg border border-white/10 focus:border-[#00A3E0] focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="electricity">Electricity</option>
                  <option value="internet">Internet</option>
                  <option value="water">Water</option>
                  <option value="gas">Gas</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Electricity', 'Internet', 'Water', 'Gas'].map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange('type', category.toLowerCase())}
            className={`px-4 py-2 rounded-lg border border-white/10 whitespace-nowrap transition-colors ${
              filters.type === category.toLowerCase()
                ? 'bg-[#00A3E0] text-white border-transparent'
                : 'bg-[#1A1A1A] text-white hover:bg-[#252525]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { UtilityCard } from '@/components/UtilityCard';
import { MarketplaceFilters } from '@/components/MarketplaceFilters';
import { useUtilize } from '@/hooks/useUtilize';
import { useState, useEffect } from 'react';
import { formatEther } from 'ethers/lib/utils';

export default function Marketplace() {
  const { listings, fetchListings } = useUtilize();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    type: 'all'
  });

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const filteredListings = listings.filter(listing => {
    if (listing.isFulfilled) return false;
    
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type === 'all' || listing.utilityType === filters.type;
    const price = parseFloat(formatEther(listing.price));
    const matchesMinPrice = !filters.minPrice || price >= parseFloat(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || price <= parseFloat(filters.maxPrice);

    return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-8">Utility Marketplace</h1>

        <MarketplaceFilters
          onSearch={setSearchQuery}
          onFilter={setFilters}
        />

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredListings.map((listing, index) => (
            <UtilityCard
              key={`${listing.id}-${index}`}
              id={listing.id}
              title={listing.title}
              seller={listing.seller}
              price={listing.price}
              rating={4.9}
              type={listing.utilityType}
            />
          ))}
          {filteredListings.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No listings found matching your criteria.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
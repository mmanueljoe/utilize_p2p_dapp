'use client';

import { useContractRead, useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi';
import { UTILIZE_ABI, UTILIZE_ADDRESS } from '@/lib/contracts/Utilize';
import { parseEther } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';

export type Listing = {
  id: number;
  seller: string;
  title: string;
  utilityType: string;
  price: string;
  isFulfilled: boolean;
};

export function useUtilize() {
  const { address } = useAccount();
  const [listings, setListings] = useState<Listing[]>([]);

  // Fetch all listings
  const { data: listingsData, refetch } = useContractRead({
    address: UTILIZE_ADDRESS as `0x${string}`,
    abi: UTILIZE_ABI,
    functionName: 'listings',
    watch: true,
  });

  // Create listing
  const { config: createListingConfig } = usePrepareContractWrite({
    address: UTILIZE_ADDRESS as `0x${string}`,
    abi: UTILIZE_ABI,
    functionName: 'createListing',
  });

  const { writeAsync: createListing, isLoading: isCreating } = useContractWrite(createListingConfig);

  // Pay for utility
  const { config: payConfig } = usePrepareContractWrite({
    address: UTILIZE_ADDRESS as `0x${string}`,
    abi: UTILIZE_ABI,
    functionName: 'pay',
  });

  const { writeAsync: payForUtility, isLoading: isPaying } = useContractWrite(payConfig);

  useEffect(() => {
    if (listingsData) {
      const formattedListings = (listingsData as any[]).map((listing, index) => ({
        id: index,
        seller: listing.seller,
        title: listing.title,
        utilityType: listing.utilityType,
        price: listing.price.toString(),
        isFulfilled: listing.isFulfilled,
      }));
      setListings(formattedListings);
    }
  }, [listingsData]);

  const handleCreateListing = async (title: string, utilityType: string, price: string) => {
    if (!address) throw new Error('Please connect your wallet');
    
    try {
      const priceInWei = parseEther(price);
      const tx = await createListing?.({
        args: [title, utilityType, priceInWei.toString()],
      });
      await tx?.wait();
      await refetch();
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  };

  const handlePayment = async (listingId: number, amount: string) => {
    if (!address) throw new Error('Please connect your wallet');
    
    try {
      const valueInWei = parseEther(amount);
      const tx = await payForUtility?.({
        args: [listingId],
        value: valueInWei,
      });
      await tx?.wait();
      await refetch();
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  };

  return {
    listings,
    createListing: handleCreateListing,
    payForUtility: handlePayment,
    isCreating,
    isPaying,
    address,
  };
}
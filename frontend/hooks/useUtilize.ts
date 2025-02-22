'use client';

import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { UTILIZE_ABI, UTILIZE_ADDRESS } from '@/lib/contracts/Utilize';
import { parseEther, formatEther } from 'viem';
import { useState, useEffect, useCallback } from 'react';

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
  const { data: listingsData, refetch } = useReadContract({
    address: UTILIZE_ADDRESS,
    abi: UTILIZE_ABI,
    functionName: 'getListings',
  });

  const fetchListings = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }, [refetch]);

  // Contract write actions
  const { writeContractAsync, isPending } = useWriteContract();

  // Create listing handler
  const handleCreateListing = async (
    title: string,
    utilityType: string,
    price: string
  ) => {
    if (!address) throw new Error('Please connect your wallet');
    
    try {
      const priceInWei = parseEther(price);
      const txHash = await writeContractAsync({
        address: UTILIZE_ADDRESS,
        abi: UTILIZE_ABI,
        functionName: 'createListing',
        args: [title, utilityType, priceInWei],
      });
      await fetchListings();
      return txHash;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  };

  // Payment handler
  const handlePayment = async (listingId: number, amount: string) => {
    if (!address) throw new Error('Please connect your wallet');
    
    try {
      const valueInWei = parseEther(amount);
      const txHash = await writeContractAsync({
        address: UTILIZE_ADDRESS,
        abi: UTILIZE_ABI,
        functionName: 'pay',
        args: [BigInt(listingId)],
        value: valueInWei,
      });
      await fetchListings();
      return txHash;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (listingsData) {
      const formattedListings = (listingsData as any[]).map((listing, index) => ({
        id: index,
        seller: listing.seller,
        title: listing.title,
        utilityType: listing.utilityType,
        price: formatEther(listing.price),
        isFulfilled: listing.isFulfilled,
      }));
      setListings(formattedListings);
    }
  }, [listingsData]);

  return {
    listings,
    fetchListings,
    createListing: handleCreateListing,
    payForUtility: handlePayment,
    isCreating: isPending,
    isPaying: isPending,
    address,
  };
}
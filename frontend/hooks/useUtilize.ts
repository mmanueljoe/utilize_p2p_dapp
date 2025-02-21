'use client';

import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { UTILIZE_ABI, UTILIZE_ADDRESS } from '@/lib/contracts/Utilize';
import { BigNumber } from 'ethers';

export function useUtilize() {
  const { data: listings } = useContractRead({
    address: UTILIZE_ADDRESS as `0x${string}`,
    abi: UTILIZE_ABI,
    functionName: 'listings',
  });

  const { config: createListingConfig } = usePrepareContractWrite({
    address: UTILIZE_ADDRESS as `0x${string}`,
    abi: UTILIZE_ABI,
    functionName: 'createListing',
  });

  const { writeAsync: createListing } = useContractWrite(createListingConfig);

  const { config: payConfig } = usePrepareContractWrite({
    address: UTILIZE_ADDRESS as `0x${string}`,
    abi: UTILIZE_ABI,
    functionName: 'pay',
  });

  const { writeAsync: payForUtility } = useContractWrite(payConfig);

  const handleCreateListing = async (title: string, utilityType: string, price: string) => {
    try {
      const priceInWei = BigNumber.from(price);
      await createListing?.({
        args: [title, utilityType, priceInWei],
      });
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  };

  const handlePayment = async (listingId: number, amount: string) => {
    try {
      const valueInWei = BigNumber.from(amount);
      await payForUtility?.({
        args: [listingId],
        value: valueInWei,
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  };

  return {
    listings,
    createListing: handleCreateListing,
    payForUtility: handlePayment,
  };
}
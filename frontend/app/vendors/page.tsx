'use client';

import { motion } from 'framer-motion';
import { Plus, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useUtilize } from '@/hooks/useUtilize';

export default function VendorsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'internet',
    price: '',
  });

  const { createListing, isCreating, address } = useUtilize();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await createListing(formData.title, formData.type, formData.price);
      setIsCreateDialogOpen(false);
      setFormData({ title: '', type: 'internet', price: '' });
      alert('Listing created successfully!');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    }
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
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-[#00A3E0] hover:bg-[#0088BD]"
          disabled={!address}
        >
          <Plus className="mr-2 h-4 w-4" /> Create Listing
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Vendor Stats */}
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

      {/* Create Listing Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1A1A1A] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Listing</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Starlink Premium Subscription"
                  className="bg-[#252525] border-white/10"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Utility Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <option value="internet">Internet</option>
                  <option value="electricity">Electricity</option>
                  <option value="water">Water</option>
                  <option value="gas">Gas</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price (ETH)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.001"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.05"
                  className="bg-[#252525] border-white/10"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-[#00A3E0] hover:bg-[#0088BD]"
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Listing'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
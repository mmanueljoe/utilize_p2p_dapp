'use client';

import { ArrowRight, Droplets, Wallet, CheckCircle2, Star, Zap, Wifi, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const UtilityCard = ({ title, price, rating, type, seller }: { 
  title: string;
  price: string;
  rating: number;
  type: string;
  seller: string;
}) => (
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
        <p className="text-[#00A3E0] font-semibold">{price}</p>
        <p className="text-sm text-gray-400">≈ $150/month</p>
      </div>
    </div>
    <button className="w-full mt-4 bg-[#00A3E0] text-white py-2 rounded-lg hover:bg-[#0088BD] transition-colors">
      Pay Now
    </button>
  </motion.div>
);

const Step = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div 
    className="flex flex-col items-center text-center"
    initial={fadeIn.initial}
    animate={fadeIn.animate}
    transition={fadeIn.transition}
  >
    <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('vendors');

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <Droplets className="text-[#00A3E0] w-16 h-16" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#00A3E0] bg-clip-text text-transparent">
              Pay Bills in Crypto. Directly. No Middlemen.
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Buy utilities from vendors or peers — electricity, water, internet — with ETH, USDC, or any token.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-[#00A3E0] rounded-lg font-semibold hover:bg-[#0088BD] transition-colors flex items-center justify-center">
                Explore Utilities
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="px-8 py-3 bg-[#1A1A1A] rounded-lg font-semibold hover:bg-[#252525] transition-colors">
                List Your Service
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Utility Listings Section */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-[#1A1A1A] p-1 rounded-lg">
              <button
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'vendors' ? 'bg-[#00A3E0] text-white' : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('vendors')}
              >
                Vendors
              </button>
              <button
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === 'p2p' ? 'bg-[#00A3E0] text-white' : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('p2p')}
              >
                P2P
              </button>
            </div>
          </div>

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
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Step
              icon={<Zap className="text-[#00A3E0]" size={32} />}
              title="Choose Utility"
              description="Browse verified vendors or P2P offers for your utility needs"
            />
            <Step
              icon={<Wallet className="text-[#00A3E0]" size={32} />}
              title="Pay Peer/Vendor"
              description="Connect your wallet and pay directly in your preferred crypto"
            />
            <Step
              icon={<CheckCircle2 className="text-[#00A3E0]" size={32} />}
              title="Done!"
              description="Your utility payment is confirmed and processed instantly"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
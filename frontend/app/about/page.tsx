'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About Utilize
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          We're building the future of utility payments, making it easier than ever to pay your bills with cryptocurrency.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-[#1A1A1A] p-6 rounded-lg"
        >
          <Shield className="text-[#00A3E0] w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Secure Payments</h3>
          <p className="text-gray-400">
            Built on blockchain technology ensuring transparent and secure transactions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-[#1A1A1A] p-6 rounded-lg"
        >
          <Users className="text-[#00A3E0] w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">P2P Network</h3>
          <p className="text-gray-400">
            Connect directly with utility providers and trusted peers in our network.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-[#1A1A1A] p-6 rounded-lg"
        >
          <Zap className="text-[#00A3E0] w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Instant Processing</h3>
          <p className="text-gray-400">
            No more waiting for traditional payment processing. Pay bills instantly.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Abduali Zesumg Osman',
              role: 'Smart Contract Developer',
              image: 'https://avatars.githubusercontent.com/u/148546209?v=4',
            },
            {
              name: 'Emmanuel Joe Letsu',
              role: 'Fullstack Developer',
              image: 'https://avatars.githubusercontent.com/u/98291413?v=4',
            },
            // {
            //   name: 'Michael Brown',
            //   role: 'Head of Operations',
            //   image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
            // },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-[#00A3E0]"
              />
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
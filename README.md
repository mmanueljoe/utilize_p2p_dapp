
# 🌐 Utilize: Decentralized Utility Payments on Arbitrum

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Arbitrum Testnet](https://img.shields.io/badge/Testnet-Arbitrum_Sepolia-blue)](https://sepolia.arbiscan.io/)

**Utilize** revolutionizes utility payments by creating a peer-to-peer marketplace where crypto holders directly pay for real-world services using digital assets - no fiat conversion required. Built on Arbitrum for low fees and Ethereum compatibility.

➡️ **Live Demo**:
📜 **Contract Address**: `0x46De9a5D781B1a738efee02B14a4FEe3BAe72D9b` (Verified on [Arbiscan](https://sepolia.arbiscan.io))



## 🚀 Key Features

- **P2P Utility Marketplace**: Trade crypto for electricity, water, internet, and other essential services
- **Non-Custodial Payments**: Direct wallet-to-wallet transactions (ETH, USDC, ARB)
- **Arbitrum-Powered**: $0.01 transaction fees, 2-second finality
- **Reputation System**: On-chain trust scoring for reliable counterparties
- **Dispute Resolution**: Community-governed arbitration system (DAO-based)

## ⚙️ Tech Stack

| Layer               | Technology                          |
|---------------------|-------------------------------------|
| **Blockchain**      | Arbitrum Nova                       |
| **Smart Contracts** | Solidity 0.8.20, Hardhat, OpenZeppelin |
| **Frontend**        | Next.js 14, wagmi.sh, Tailwind CSS  |
| **Oracles**         | Chainlink Price Feeds (ETH/USD)     |
| **APIs**            | The Graph (Transaction History)     |

## 📦 Installation

### Smart Contracts
```bash
git clone
cd https://github.com/mmanueljoe/utilize_p2p_dapp.git
npm install
cp .env.example .env 
npx hardhat test
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 🛠️ Usage

1. **Sellers Create Listings**
   - Connect wallet (MetaMask/RainbowKit)
   - Post utility offerings: "1 Month Starlink - 0.05 ETH"
   - Set terms & crypto acceptance

2. **Buyers Discover Services**
   - Filter by utility type/crypto
   - View seller reputation scores
   - One-click payments via MetaMask

3. **Post-Transaction**
   - Automatic reputation updates
   - On-chain payment verification
   - Dispute escalation (if needed)

## 📜 Smart Contract Architecture

### Core Functions
```solidity
function createListing(
  string memory utilityType,
  uint256 price,
  address acceptedToken
) external;

function executePayment(uint256 listingId) external payable;

function raiseDispute(uint256 listingId) external;
```

### Key Addresses
- **Main Contract**: 
- **Testnet**: Arbitrum Sepolia
- **Verified Contract**:

## 🌟 Why Arbitrum?

- **Cost Efficiency**: 95% cheaper than Ethereum L1
- **Scalability**: 40,000+ TPS capacity
- **EVM Compatibility**: Seamless tooling integration
- **Security**: Inherits Ethereum's battle-tested consensus

## 📈 Roadmap

Q3 2024: MVP Launch (Arbitrum Testnet)  
Q4 2024: Cross-Chain Payments (Base, Polygon)  
Q1 2025: Mobile App Release  
Q2 2025: DAO Governance Implementation

## 🤝 Contributing

We welcome community contributions:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under MIT License - see [LICENSE.md](LICENSE.md) for details.

## ✉️ Contact

**Core Team**  
- CEO: [Abdulai Osman](https://github.com/Abduali059)    
- CTO: [Emmanuel Joe Letsu](https://github.com/mmanueljoe)  
- Email:

```
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv";

dotenv.config();

const {ALCHEMY_API_KEY,DEPLOYER_PRIVATE_KEY} = process.env;


const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    arbitrumSepolia:{
      url: `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`]
    }
  }
};

export default config;

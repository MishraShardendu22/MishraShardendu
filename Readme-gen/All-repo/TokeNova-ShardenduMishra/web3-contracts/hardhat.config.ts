import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";
import dotenv from 'dotenv'

dotenv.config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    // sepolia: {
    //   url: API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // }
  },
};

export default config;

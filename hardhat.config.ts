import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-ethernal";
import * as dotenv from 'dotenv'
dotenv.config() // 导入 dotenv

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: { // 确保 Hardhat Network 默认网络配置存在
      chainId: 31337, // 默认的 Hardhat Network chain ID
    },
    localhost: { // 如果你用 `npx hardhat node` 启动，也要有这个配置
      url: "http://127.0.0.1:8545",
      chainId: 31337, // Hardhat Network 的 chain ID
    }
  },
  ethernal: {
    disabled: false,
    uploadAst: true,
    disableSync: false, // 启用自动同步
    workspace: "hardhat-tutor", // 可选，给你的工作区命名
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    // 你也可以在这里配置 apiToken，但通常通过环境变量 ETHERNAL_API_TOKEN 更安全
  },
};

export default config;

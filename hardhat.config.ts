// hardhat.config.ts
import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem"; // <-- 暂时注释掉
import "@nomicfoundation/hardhat-ethers";
import "hardhat-gas-reporter"
import "hardhat-ethernal";
import "hardhat-tracer";

// 如果你需要 .env 文件中的常量，保留这行
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28", // 你的 Solidity 版本
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    // 如果你有其他网络，也可以暂时注释掉
  },
  tracer: {
    tasks: ["deploy", "run"],
  },
  ethernal: {
    disabled: false,
    uploadAst: true,
    disableSync: false,
    workspace: "hardhat-tutor",
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
};

export default config;

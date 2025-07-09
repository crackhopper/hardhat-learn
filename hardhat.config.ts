import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@typechain/hardhat";
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
  typechain: {
    outDir: "typechain-types", // 生成的类型文件将放在这个目录，这是默认值，但明确写出来更好
    target: "ethers-v6", // **这一行是关键！** 使用 `ethers-v6` 目标
    // 或者，如果你使用的是 ethers.js v5: target: "ethers-v5",
    // 如果你明确想为 Viem 生成，你需要安装 @typechain/web3 或者其他专门的 Viem 目标库，通常不需要，因为 Viem 更多是直接与 ABI 交互，不需要 TypeChain 额外生成类型。
    alwaysGenerateOverloads: true, // 推荐：为函数重载生成单独的类型
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

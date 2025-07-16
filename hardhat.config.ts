// hardhat.config.ts
import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem"; // <-- 暂时注释掉
import "@nomicfoundation/hardhat-ethers";
import "hardhat-gas-reporter";
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
    gasCost: true,
  },
  ethernal: {
    disabled: false,
    uploadAst: true,
    disableSync: false,
    workspace: "hardhat-tutor",
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false, // 只在设置环境变量时启用
    currency: "USD", // 显示美元估算成本
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice", // 获取实时 Gas Price，免费 5次/秒
    //coinmarketcap: 'YOUR_COINMARKETCAP_API_KEY', // 获取 ETH 兑美元汇率
    // outputFile: "gas-report.txt", // 将报告输出到文件
    noColors: false, // 禁用颜色输出到文件
    L1: "ethereum", // 为 L1 网络配置 （查询主网的gas price，结合当前gasUsed来评估费用）
    // L2: 'optimism', // 如果你在 L2 上部署，可以配置 L2 网络
    // includeIntrinsicGas: true, // 包含 21000 基础 Gas 和 calldata 开销
  },
};

console.log(config);


export default config;

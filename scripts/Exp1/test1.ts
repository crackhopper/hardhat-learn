// 验证脚本
// 操作Exp1合约，调用 payFinneyWithSend, payFinneyWithTransfer, payFinneyWithCall 实现：
// - 向Contract1转账：send/transfer/call 均可以成功。查验交易历史数据、查看账户/合约余额。理解交易数据。
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  parseEther,
  formatEther,
  ContractFunctionExecutionError,
  PublicClient,
} from "viem";
import { hardhat } from "viem/chains";
import hre from "hardhat"; // 引入 Hardhat Runtime Environment
import { privateKeyToAccount } from "viem/accounts";

// Hardhat 自动生成的 artifacts
import Contract1Json from "../../artifacts/contracts/Contract1.sol/Contract1.json";
// import { Contract1$Type } from "../../artifacts/contracts/Contract1.sol/Contract1"; // Viem 类型，此处不再需要
const Contract1Abi = Contract1Json.abi; // 直接使用 ABI

import Contract2Json from "../../artifacts/contracts/Contract2.sol/Contract2.json";
// import { Contract2$Type } from "../../artifacts/contracts/Contract2.sol/Contract2"; // Viem 类型，此处不再需要
const Contract2Abi = Contract2Json.abi; // 直接使用 ABI

import Exp1Json from "../../artifacts/contracts/experiments/Exp1.sol/Exp1.json";
// import { Exp1$Type } from "../../artifacts/contracts/experiments/Exp1.sol/Exp1"; // Viem 类型，此处不再需要
const Exp1Abi = Exp1Json.abi; // 直接使用 ABI

import {
  Contract1Address,
  Contract2Address,
  Exp1Address,
  wallet0_pk,
} from "../consts";

// --- Hardhat Ethers.js 相关变量 ---
let exp1ContractEthers: any; // 使用 any 简化类型，实际项目中应使用 ethers.Contract 类型
let contract1ContractEthers: any;
let contract2ContractEthers: any;
let deployerEthers: any; // Hardhat Ethers.js 的 Signer

// Viem 客户端保持不变，用于余额查询等公共操作
const account0 = privateKeyToAccount(wallet0_pk);
const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});
const walletClient = createWalletClient({
  account: account0,
  chain: hardhat,
  transport: http(),
});

// Viem 合约实例保持不变，用于余额查询等公共操作
const exp1ContractViem = getContract({
  address: Exp1Address,
  abi: Exp1Abi,
  client: {
    wallet: walletClient,
    public: publicClient,
  },
});

const contract1ContractViem = getContract({
  address: Contract1Address,
  abi: Contract1Abi,
  client: {
    wallet: walletClient,
    public: publicClient,
  },
});

const contract2ContractViem = getContract({
  address: Contract2Address,
  abi: Contract2Abi,
  client: {
    wallet: walletClient,
    public: publicClient,
  },
});

async function anotherRun() {
  hre.tracer.enabled = true;
  const [owner, otherAccount] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();

  await showBalance(publicClient);
  const contract = await hre.viem.getContractAt("Exp1", Exp1Address);
  const txHash = await contract.write.payFinneyWithCall([
    Contract1Address,
  ]);
  await logTransaction(publicClient, txHash);
  await showBalance(publicClient);

  const traces = hre.tracer.allTraces();
  console.log(traces);

  hre.tracer.enabled = false;

}

// 关于viem的contract实例的用法：
// https://viem.sh/docs/contract/getContract#contract-instances

async function showBalance(pubClient: PublicClient) {
  const balanceExp1 = await pubClient.getBalance({
    address: Exp1Address,
  });
  const balanceContract1 = await pubClient.getBalance({
    address: Contract1Address,
  });
  const balanceContract2 = await pubClient.getBalance({
    address: Contract2Address,
  });

  const balanceAccount0 = await pubClient.getBalance({
    address: account0.address,
  });
  console.log(`Exp1 合约余额: ${formatEther(balanceExp1, "gwei")} gwei`);
  console.log(
    `Contract1 合约余额: ${formatEther(balanceContract1, "gwei")} gwei`
  );
  console.log(
    `Contract2 合约余额: ${formatEther(balanceContract2, "gwei")} gwei`
  );
  console.log(`0号账户余额: ${formatEther(balanceAccount0, "gwei")} gwei`);
}

// 自定义 replacer 函数，将 BigInt 转换为字符串
const replacer = (key: any, value: any) =>
  typeof value === "bigint" ? value.toString() : value;

async function logTransaction(pubClient: PublicClient, txHash: `0x${string}`) {
  const tx = await pubClient.getTransaction({
    hash: txHash,
  });
  console.log(`交易信息: ${JSON.stringify(tx, replacer)}`);
  const txReceipt = await pubClient.getTransactionReceipt({
    hash: txHash,
  });

  console.log(`交易回执: ${JSON.stringify(txReceipt, replacer)}`);

  console.log("Gas Used:", txReceipt.gasUsed.toString());
  console.log(
    "Effective Gas Price:",
    formatEther(txReceipt.effectiveGasPrice, "gwei"),
    "gwei/Gas"
  );
  console.log(
    "Total Cost (Gas):",
    formatEther(txReceipt.gasUsed * txReceipt.effectiveGasPrice, "gwei"),
    "gwei"
  );
  console.log("输入数据 (Input Data):", tx.input);
}

async function getEvents() {
  // 监听events
  // 在BaseContract中定义为： event ReceivedETH(address indexed from, uint amount, string method);
  const events = await contract1ContractViem.getEvents.ReceivedETH(); // 使用 Viem 客户端获取事件
  console.log("ReceivedETH events:", events);

  const events2 = await exp1ContractViem.getEvents.logResult(); // 使用 Viem 客户端获取事件
  console.log("logResult events:", events2);
}

// 操作Exp1合约，调用 payFinneyWithSend, payFinneyWithTransfer, payFinneyWithCall 实现：
// - 向Contract1转账：send/transfer/call 均可以成功。查验交易历史数据、查看账户/合约余额。理解交易数据。
async function runTest_Send() {
  await showBalance(publicClient);
  // 使用 ethers.js 实例调用方法
  const tx = await exp1ContractEthers.payFinneyWithSend(Contract1Address);
  const receipt = await tx.wait(); // 等待交易确认
  console.log("payFinneyWithSend txHash:", receipt.hash);
  await logTransaction(publicClient, receipt.hash);
  await showBalance(publicClient);
  await getEvents();
}

async function runTest_Send2() {
  await showBalance(publicClient);

  // 使用 ethers.js 实例调用方法
  const tx = await exp1ContractEthers.payFinneyWithSend(Contract2Address);
  const receipt = await tx.wait(); // 等待交易确认
  console.log("payFinneyWithSend txHash:", receipt.hash);
  await logTransaction(publicClient, receipt.hash);
  await showBalance(publicClient);
  await getEvents();
}

async function runTest_Transfer() {
  await showBalance(publicClient);
  // 调用 payFinneyWithTransfer
  try {
    // Hardhat Tracer 应该在 main 函数中全局启用/禁用
    // hre.tracer.enabled = true; // 移除这里的启用/禁用，由 main 函数统一控制
    const tx = await exp1ContractEthers.payFinneyWithTransfer(
      Contract1Address,
      { gasLimit: 100000 } // ethers.js 中是 gasLimit，不是 gas
    );
    const receipt = await tx.wait(); // 等待交易确认
    // hre.tracer.enabled = false; // 移除这里的启用/禁用
    console.log("payFinneyWithTransfer txHash:", receipt.hash);
    await logTransaction(publicClient, receipt.hash);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // 捕获 ethers.js 错误
      console.error("交易失败:", error.message);
      // ethers.js 的错误对象结构与 Viem 不同，需要相应调整错误处理逻辑
      // 例如，ethers.js 的错误可能包含 `transactionHash` 或 `receipt` 属性
      // if ((error as any).transactionHash) {
      //   console.log("失败交易哈希:", (error as any).transactionHash);
      // }
    } else {
      console.error("发生未知错误:", error);
    }
  }
  await showBalance(publicClient);
  await getEvents();
}

async function runTest_Call() {
  await showBalance(publicClient);
  // 调用 payFinneyWithCall
  const tx = await exp1ContractEthers.payFinneyWithCall(Contract1Address);
  const receipt = await tx.wait(); // 等待交易确认
  console.log("payFinneyWithCall txHash:", receipt.hash);
  await logTransaction(publicClient, receipt.hash);
  await showBalance(publicClient);
  await getEvents();
}

async function main() {
  await anotherRun();
}

// Hardhat 推荐的脚本启动方式
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

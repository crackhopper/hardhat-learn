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
} from "viem";
import { hardhat } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

import Contract1Json from "../../artifacts/contracts/Contract1.sol/Contract1.json";
import { Contract1$Type } from "../../artifacts/contracts/Contract1.sol/Contract1";
const Contract1Abi = Contract1Json.abi as Contract1$Type["abi"];

import Exp1Json from "../../artifacts/contracts/experiments/Exp1.sol/Exp1.json";
import { Exp1$Type } from "../../artifacts/contracts/experiments/Exp1.sol/Exp1";
const Exp1Abi = Exp1Json.abi as Exp1$Type["abi"];


import { Contract1Address, Exp1Address, wallet0_pk } from "../consts";


// 使用0号钱包的私钥
const account0 = privateKeyToAccount(wallet0_pk);

// 创建 Viem 公共客户端
const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

// 创建 Viem 钱包客户端 (用于发送交易)
const walletClient = createWalletClient({
  account: account0, // 使用0号账户
  chain: hardhat,
  transport: http(),
});

// 创建 Exp1 的 Viem 合约实例
const exp1Contract = getContract({
  address: Exp1Address,
  abi: Exp1Abi,
  client: {
    wallet: walletClient,
    public: publicClient,
  },
});

// 获取 Contract1 的 Viem 合约实例 (如果需要读取它的状态或调用函数)
const contract1Contract = getContract({
  address: Contract1Address,
  abi: Contract1Abi,
  client: {
    wallet: walletClient,
    public: publicClient,
  },
});

// 关于viem的contract实例的用法：
// https://viem.sh/docs/contract/getContract#contract-instances

async function showBalance() {
  const balanceExp1 = await publicClient.getBalance({
    address: Exp1Address,
  });
  const balanceContract1 = await publicClient.getBalance({
    address: Contract1Address,
  });
  const balanceAccount0 = await publicClient.getBalance({
    address: account0.address,
  });
  console.log(`Exp1 合约余额: ${formatEther(balanceExp1, "gwei")} gwei`);
  console.log(
    `Contract1 合约余额: ${formatEther(balanceContract1, "gwei")} gwei`
  );
  console.log(`0号账户余额: ${formatEther(balanceAccount0, "gwei")} gwei`);
}

// 自定义 replacer 函数，将 BigInt 转换为字符串
const replacer = (key: any, value: any) =>
  typeof value === 'bigint' ? value.toString() : value;

async function logTransaction(txHash: `0x${string}`) {
  const tx = await publicClient.getTransaction({
    hash: txHash,
  });
  console.log(`交易信息: ${JSON.stringify(tx, replacer)}`);
  const txReceipt = await publicClient.getTransactionReceipt({
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
  const events = await contract1Contract.getEvents.ReceivedETH();
  console.log("ReceivedETH events:", events);

  const events2 = await exp1Contract.getEvents.logResult();
  console.log("logResult events:", events2);
}

// 操作Exp1合约，调用 payFinneyWithSend, payFinneyWithTransfer, payFinneyWithCall 实现：
// - 向Contract1转账：send/transfer/call 均可以成功。查验交易历史数据、查看账户/合约余额。理解交易数据。
async function runTest_Send(){
    await showBalance();
    // console.log('gas estimated for payFinneyWithSend:', await exp1Contract.estimateGas.payFinneyWithSend([Contract1Address]));
    // 调用 payFinneyWithSend
    const txHash1 = await exp1Contract.write.payFinneyWithSend([Contract1Address]);
    console.log("payFinneyWithSend txHash:", txHash1);
    await logTransaction(txHash1);
    await showBalance();
    await getEvents();
}

async function runTest_Transfer(){
    await showBalance();
    // 调用 payFinneyWithTransfer
    const txHash2 = await exp1Contract.write.payFinneyWithTransfer([Contract1Address]);
    console.log("payFinneyWithTransfer txHash:", txHash2);
    await logTransaction(txHash2);
    await showBalance();
    await getEvents();
}

async function runTest_Call(){
    await showBalance();
    // 调用 payFinneyWithCall
    const txHash3 = await exp1Contract.write.payFinneyWithCall([Contract1Address]);
    console.log("payFinneyWithCall txHash:", txHash3);
    await logTransaction(txHash3);
    await showBalance();
    await getEvents();
}

async function main(){
    await runTest_Send();
}

main();
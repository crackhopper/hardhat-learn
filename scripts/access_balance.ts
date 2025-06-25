import hre from "hardhat";
// import { time } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers"; // 如果需要 time 辅助函数
async function main() {
  const [owner] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();
  const lockAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 使用 Ignition 部署后显示的地址

  const lock = await hre.viem.getContractAt("Lock", lockAddress, {
    client: { wallet: owner },
  });

  const contractBalance = await publicClient.getBalance({
    address: lock.address,
  });
  console.log(`Contract Balance: ${contractBalance}`);
}

main();

import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseEther, parseGwei } from "viem";

describe("Exp1", function () {
  async function deployContracts() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();
    const contract1 = await hre.viem.deployContract("Contract1");
    const contract2 = await hre.viem.deployContract("Contract2");
    const exp1 = await hre.viem.deployContract("Exp1", [contract1.address], {
      value: parseEther("1"),
    });

    return {
      contract1,
      contract2,
      exp1,
      owner,
      otherAccount,
      publicClient,
    };
  }

  it("Exp1", async function () {
    const { contract1, contract2, exp1, owner, otherAccount, publicClient } =
      await loadFixture(deployContracts);
    
    const txHash = await exp1.write.payFinneyWithCall([contract1.address]);
    const txReceipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    expect(txReceipt.status).to.equal('success');
  });

  it("Send Raw Ether to contract1", async function () {
    const { contract1, contract2, exp1, owner, otherAccount, publicClient } =
      await loadFixture(deployContracts);
    const txHash = await otherAccount.sendTransaction({
      to: contract1.address,
      value: parseEther("1"),
    })
    const txReceipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    console.log('gas used: ', txReceipt.gasUsed);
    expect(txReceipt.status).to.equal('success');
  })

  it("send raw ether to contract2", async function () {
    const { contract1, contract2, exp1, owner, otherAccount, publicClient } =
      await loadFixture(deployContracts);
    const txHash = await otherAccount.sendTransaction({
      to: contract2.address,
      value: parseEther("1"),
    })
    const txReceipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    console.log('gas used: ', txReceipt.gasUsed);
    expect(txReceipt.status).to.equal('success');
  })

});

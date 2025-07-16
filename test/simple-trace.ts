import { expect } from "chai";
import hre from "hardhat";

describe("Simple Tracer Example", function () {
  let targetAddress: string;
  let callerAddress: string;

  before(async function () {
    const Target = await hre.ethers.getContractFactory("SimpleTracerTarget");
    const target = await Target.deploy();
    await target.waitForDeployment();
    targetAddress = await target.getAddress();
    console.log(`SimpleTracerTarget deployed to: ${targetAddress}`);

    const Caller = await hre.ethers.getContractFactory("SimpleTracerCaller");
    const caller = await Caller.deploy();
    await caller.waitForDeployment();
    callerAddress = await caller.getAddress();
    console.log(`SimpleTracerCaller deployed to: ${callerAddress}`);
  });

  it("should trace a simple call", async function () {
    console.log("\n--- Tracing a simple call (from test) ---");
    const caller = await hre.ethers.getContractAt(
      "SimpleTracerCaller",
      callerAddress
    );
    const tx = await caller.callTarget(targetAddress);
    await tx.wait();
    // traverse to the right location in the trace and extract the gasUsed
    console.log("Simple call executed.");
  });
});

import hre from "hardhat";
import { wrapTracer } from "hardhat-tracer";


wrapTracer(hre, hre.network.provider);
hre.tracer.enabled = true;
hre.tracer.verbosity = 3;

async function main() {
  const target = await hre.ethers.deployContract("SimpleTracerTarget");
  const targetAddress = await target.getAddress();
  console.log(`SimpleTracerTarget deployed to: ${targetAddress}`);

  const caller = await hre.ethers.deployContract("SimpleTracerCaller");
  const callerAddress = await caller.getAddress();
  console.log(`SimpleTracerCaller deployed to: ${callerAddress}`);
  hre.tracer.enabled = true;

  // hre.tracer.enabled = true;
  console.log("\n--- Tracing a simple call ---");
  try {
    const tx = await caller.callTarget(targetAddress);
    await tx.wait();
  } catch (error) {

  }
  console.log(hre.tracer.lastTrace());
  console.log("Simple call executed.");
  // hre.tracer.enabled = false;
  console.log("\n--- Tracer Disabled ---");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";
import { AllContractsModule } from "../AllContracts";

const ONE_ETH = parseEther("1");
const Exp1ContractModule = buildModule("Exp1Module", (m) => {
  m.useModule(AllContractsModule);
  
  const fallbackReceiveAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const exp1Contract = m.contract("Exp1", [fallbackReceiveAddr], {
    value: ONE_ETH,
  });
  return { testContract: exp1Contract };
});
export default Exp1ContractModule;

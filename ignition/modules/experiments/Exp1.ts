import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";
import { AllContractsModule } from "../AllContracts";

const ONE_ETH = parseEther("1");
const Exp1ContractModule = buildModule("Exp1Module", (m) => {
  m.useModule(AllContractsModule);
  
  const fallbackReceiveAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const exp1Contract = m.contract("Exp1", [fallbackReceiveAddr], {
    value: ONE_ETH,
  });
  return { testContract: exp1Contract };
});
export default Exp1ContractModule;

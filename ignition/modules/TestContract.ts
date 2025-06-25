import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const ONE_HUNDRED_ETH = parseEther("100")
const TestContractModule = buildModule("TestContractModule", (m) => {
    const testContract = m.contract("TestContract", [], {
        value: ONE_HUNDRED_ETH,
    });
    return { testContract };
});

export default TestContractModule;

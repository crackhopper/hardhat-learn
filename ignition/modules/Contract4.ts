import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const ONE_HUNDRED_ETH = parseEther("100")
const Contract4Module = buildModule("Contract4Module", (m) => {
    const contract4 = m.contract("Contract4", [], {
        value: ONE_HUNDRED_ETH,
    });
    return { contract4 };
});

export default Contract4Module;

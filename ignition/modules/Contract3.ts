import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const ONE_HUNDRED_ETH = parseEther("100")
const Contract3Module = buildModule("Contract3Module", (m) => {
    const contract3 = m.contract("Contract3", [], {
        value: ONE_HUNDRED_ETH,
    });
    return { contract1: contract3 };
});

export default Contract3Module;

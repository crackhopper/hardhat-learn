import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const ONE_HUNDRED_ETH = parseEther("100")
const Contract1Module = buildModule("Contract1Module", (m) => {
    const contract1 = m.contract("Contract1", [], {
        value: ONE_HUNDRED_ETH,
    });
    return { contract1 };
});

export default Contract1Module;

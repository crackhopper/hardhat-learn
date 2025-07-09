import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export const AllContractsModule = buildModule("AllContractsModule", (m) => {
  const contract1 = m.contract("Contract1", [], {});
  const contract2 = m.contract("Contract2", [], {});
  const contract3 = m.contract("Contract3", [], {});
  const contract4 = m.contract("Contract4", [], {});
  return { contract1, contract2, contract3, contract4 };
});
export default AllContractsModule;

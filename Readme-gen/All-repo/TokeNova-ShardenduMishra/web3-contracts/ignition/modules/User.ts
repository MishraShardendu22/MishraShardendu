import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("UserModule", (m) => {
  const userContract = m.contract("User");

  return { userContract };
});

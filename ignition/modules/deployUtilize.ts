import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";

const utilizeModule = buildModule("UtilizeModule",(m) => {
  const utilize = m.contract("Utilize");
  return { utilize };
});

export default utilizeModule;
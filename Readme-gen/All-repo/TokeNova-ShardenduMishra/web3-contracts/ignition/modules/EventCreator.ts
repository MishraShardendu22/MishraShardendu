import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EventCreatorModule = buildModule("EventCreatorModule", (m) => {
  // Deploy the EventCreator contract
  const eventCreator = m.contract("EventCreator");

  return { eventCreator };
});

export default EventCreatorModule;

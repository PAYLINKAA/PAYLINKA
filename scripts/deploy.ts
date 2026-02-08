import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying PaylinkaRouter...\n");

  const PaylinkaRouter = await ethers.getContractFactory("PaylinkaRouter");
  const router = await PaylinkaRouter.deploy();

  await router.waitForDeployment();

  const address = await router.getAddress();
  console.log(`💎 PaylinkaRouter deployed to: ${address}`);
  console.log(`   Network: ${(await ethers.provider.getNetwork()).name}`);
  console.log(`\n✅ Deployment complete!`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Update frontend/src/lib/constants.ts with the contract address`);
  console.log(`   2. Run the frontend: cd frontend && npm run dev`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require("hardhat");

async function main() {
  const carRenterFactory = await hre.ethers.getContractFactory("CarRenter");
  const CarRenter = await carRenterFactory.deploy();
  await CarRenter.deployed();
  console.log("Contract deployed to:", CarRenter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

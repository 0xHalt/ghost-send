const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const { AAVE_POOL_ADDRESS_MAINNET, AAVE_POOL_ADDRESS_KOVAN, PRIVATE_KEY } = process.env;

    const network = hre.network.name;
    let poolAddress;

    if (network === "mainnet") {
        poolAddress = AAVE_POOL_ADDRESS_MAINNET;
    } else if (network === "kovan") {
        poolAddress = AAVE_POOL_ADDRESS_KOVAN;
    } else {
        throw new Error("Unsupported network. Please use mainnet or kovan.");
    }

    console.log(`Deploying to network: ${network}`);
    console.log(`Using Aave Pool Address: ${poolAddress}`);

    const FlashLoanExample = await ethers.getContractFactory("FlashLoanExample");
    const flashLoanExample = await FlashLoanExample.deploy(poolAddress);

    await flashLoanExample.deployed();

    console.log(`FlashLoanExample deployed to: ${flashLoanExample.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying contract:", error);
        process.exit(1);
    });

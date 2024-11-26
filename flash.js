const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const { PRIVATE_KEY } = process.env;
    const [deployer] = await ethers.getSigners();

    console.log(`Executing flash loan with account: ${deployer.address}`);
    console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

    const flashLoanAddress = "0xYourDeployedContractAddress";

    if (flashLoanAddress === "0xYourDeployedContractAddress") {
        throw new Error("Please set the flashLoanAddress variable in executeFlashLoan.js");
    }

    const FlashLoanExample = await ethers.getContractFactory("FlashLoanExample");
    const flashLoan = FlashLoanExample.attach(flashLoanAddress);

    const asset = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
    const amount = ethers.utils.parseUnits("1000", 18); 

    const ERC20 = await ethers.getContractAt("IERC20", asset);
    const balanceBefore = await ERC20.balanceOf(deployer.address);
    console.log(`Balance before flash loan: ${ethers.utils.formatUnits(balanceBefore, 18)} tokens`);

    const tx = await flashLoan.executeFlashLoan(asset, amount, {
        gasPrice: ethers.utils.parseUnits("50", "gwei"), // Set a competitive gas price
        gasLimit: 3000000, // Adjust based on your contract's requirements
    });
    console.log("Flash loan transaction sent. Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);

    const balanceAfter = await ERC20.balanceOf(deployer.address);
    console.log(`Balance after flash loan: ${ethers.utils.formatUnits(balanceAfter, 18)} tokens`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error executing flash loan:", error);
        process.exit(1);
    });

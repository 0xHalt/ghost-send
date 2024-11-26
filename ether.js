const tx = await flashLoan.executeFlashLoan(asset, amount, {
    gasPrice: ethers.utils.parseUnits('50', 'gwei'), // Set to a competitive gas price 
    gasLimit: 3000000, 
});
await tx.wait();
console.log("Flash loan executed successfully!");

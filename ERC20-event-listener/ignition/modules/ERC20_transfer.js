const { ethers } = require("hardhat");
const { parseUnits } = ethers;

(async () => {

     // Load the ERC20 token contract
  const Token = await ethers.getContractFactory("FungibleToken");
  const tokenContract = await Token.attach("0x6C38eF9d310Fbf56cB2710AdFDA1617625dC2E23");


  // console.log(tokenContract);

  const recipientAddress = "0xa1eB35A03D01611f661220349037F5E4C1D0F53F";

  // amount of tokens to transfer
  const amount = parseUnits("100", 18);

  // Perform transfer
  const tx = await tokenContract.transfer(recipientAddress, amount);
  console.log("Transfer transaction hash:", tx.hash);

  // Wait for the transaction to be mined
  await tx.wait();
  console.log("Transfer completed successfully");


})();
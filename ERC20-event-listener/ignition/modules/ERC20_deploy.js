const { ethers } = require("hardhat");


//Deployed Contract address: 0x6C38eF9d310Fbf56cB2710AdFDA1617625dC2E23

(async () => {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying ERC20Token contract with the account:", deployer.address);

  // // Deploying ERC20Token contract

  const ERC20Token = await ethers.getContractFactory("FungibleToken");
  const erc20Token = await ERC20Token.deploy(deployer.address);

  const contractAddress = await erc20Token.getAddress();

})();

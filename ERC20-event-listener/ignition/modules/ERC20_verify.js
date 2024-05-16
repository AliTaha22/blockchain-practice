const { ethers, run } = require("hardhat");


(async () => {

    const [deployer] = await ethers.getSigners();


    const ERC20Token = await ethers.getContractFactory("FungibleToken");
    const result = await run("verify:verify", { address: "0x6C38eF9d310Fbf56cB2710AdFDA1617625dC2E23", constructorArguments: [deployer.address]})
    console.log(result);


})();
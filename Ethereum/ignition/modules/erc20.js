const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying ERC20Token contract with the account:", deployer.address);

    // Deploying ERC20Token contract
    const ERC20Token = await ethers.getContractFactory("ERC20");
    const erc20Token = await ERC20Token.deploy("My ERC20 Token", "ERC20", 1000000);

    const contractAddress = await erc20Token.getAddress();

    //console.log("ERC20Token address:", erc20Token.address);
}

main();
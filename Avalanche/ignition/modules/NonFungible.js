const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying NonFungible contract with the account:", deployer.address);

     // Deploying ERC721Token contract
    const ERC721Token = await ethers.getContractFactory("NonFungible");
    const erc721Token = await ERC721Token.deploy(deployer.address);

    console.log("ERC721Token address:", erc721Token);

}

main();
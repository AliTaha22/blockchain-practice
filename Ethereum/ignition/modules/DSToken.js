const { ethers, run } = require("hardhat");
require("@nomiclabs/hardhat-etherscan")

async function main() {
    // const [deployer] = await ethers.getSigners();

    // console.log("Deploying DSToken contract with the account:", deployer.address);

    // // Deploying ERC20Token contract
    const ERC721Token = await ethers.getContractFactory("DSToken");
    // const erc721Token = await ERC721Token.deploy(deployer.address);

    // console.log("ERC721Token address:", await erc721Token.address);
    const args = [
        "0x92b2421a252F9329C401Bd379D9926Ef2162138f"
    ]
    await run("verify:verify", { address: "0x9273cfba41d3eaA3582c8E00109691E99689e997", constructorArguments: args });
}

main();
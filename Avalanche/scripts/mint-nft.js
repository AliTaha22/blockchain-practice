const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners(); //address to mint the NFT to

    // Address of the deployed ERC721 contract
    const contractAddress = "0x4C791fBAEd0C819BB47b3929912F427790b30c65"; 
    const contract = await ethers.getContractAt("NonFungible", contractAddress);

    // Minting an NFT
    const uri = "https://bronze-defeated-tuna-485.mypinata.cloud/ipfs/QmQN6WT33WSdtMtrTTMon1f6SnzHt1nE4xqhZBXcb2q89w";
    const response = await contract.safeMint(deployer.address, uri);
    console.log(response)
}

main();
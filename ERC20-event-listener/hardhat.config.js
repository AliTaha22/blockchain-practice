require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/34YV2G8n7RR0O_rECRkdTqkWe1GkUZpi",
      accounts: ["8b764ca92f524fd732cb1ae294d4b77601168ee66bd4b0e8196a8ad145039658"]
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "FK459EI7G7BR18NYIRC6G7BRXR671SBG4X"
    }
  }
};

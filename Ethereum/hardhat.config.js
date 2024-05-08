
require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/34YV2G8n7RR0O_rECRkdTqkWe1GkUZpi",
      accounts: ["8b764ca92f524fd732cb1ae294d4b77601168ee66bd4b0e8196a8ad145039658"]
    },
    polygonMumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/EbUEmChNro5DJKoZvqVLGqgftmoOZQE7",
      accounts: ["8b764ca92f524fd732cb1ae294d4b77601168ee66bd4b0e8196a8ad145039658"]
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "VSK3XXJXYHPB413VHK4DW4SJV6JH69NJX6"
    }
  }
};



require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/34YV2G8n7RR0O_rECRkdTqkWe1GkUZpi",
      accounts: ["YOUR_PRIVATE_KEY"]
    },
    polygonMumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/EbUEmChNro5DJKoZvqVLGqgftmoOZQE7",
      accounts: ["YOUR_PRIVATE_KEY"]//same as sepolia here
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "VSK3XXJXYHPB413VHK4DW4SJV6JH69NJX6"
    }
  }
};


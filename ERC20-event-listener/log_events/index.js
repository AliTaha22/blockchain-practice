require('dotenv').config();
const { ethers } = require('ethers');
const mongoose = require('mongoose');
const EventLog = require('./models/events_schema');

const contractAddress = "0x6C38eF9d310Fbf56cB2710AdFDA1617625dC2E23";
const contractABI = require('./../artifacts/contracts/ERC20.sol/FungibleToken.json').abi;
const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/34YV2G8n7RR0O_rECRkdTqkWe1GkUZpi");

const FungibleContract = new ethers.Contract(contractAddress, contractABI, provider);


// Connect to MongoDB
mongoose.connect(process.env.db_url, {
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

(async () => {

    FungibleContract.on('*', async (event) => {

        // console.log(eventName);
        // console.log(`Received event: ${eventName}`);

        console.log(event);

        // Extract relevant event details
        const eventData = {
            eventName: event.event,
            from: event.args.from,
            to: event.args.to,
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash,
            logIndex: event.logIndex
        };
        console.log(eventData);

        try {
            // Save event details to MongoDB
            await EventLog.create(eventData);
            console.log("Event details saved to MongoDB");
        } catch (error) {
            console.error("Error saving event details to MongoDB:", error);
        }

    });

})();
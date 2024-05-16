const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//this will add a condition on how the document should be presented/added to the DB.
const eventSchema = new Schema({

    eventName: String,
    from: String,
    to: String,
    blockNumber: Number,
    transactionHash: String,
    logIndex: Number,
}, {timestamps: true});

// export const Event = mongoose.model('Event', eventSchema);
module.exports = mongoose.model('Event', eventSchema);
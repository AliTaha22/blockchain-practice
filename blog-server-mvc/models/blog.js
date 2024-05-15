import mongoose from "mongoose";

const Schema = mongoose.Schema;

//this will add a condition on how the document should be presented/added to the DB.
const blogSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Blog = mongoose.model('Blog', blogSchema);

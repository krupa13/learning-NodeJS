const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

const chatSchema = new mongoose.Schema({
    participants: [{
        // Participants would be of type objectId of users
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [messageSchema]
});

module.exports = mongoose.model("Chat", chatSchema);
const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
    productId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    productName: String,
    username: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
    closedAt: Date,
    status: String,
    unreadmsgs: Number,
    clientUnreadMsg: Number,
    url: String,
    messages: [{
        username: String,
        icon: String,
        message: String,
        msgread: Number,
        msgreadowner: Number,
        messageDate: {
            type: Date,
            default: Date.now,
        },
    }],
});

module.exports = model('Chat', ChatSchema);

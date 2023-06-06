const { Schema, model } = require("mongoose");

const OwnerSchema = new Schema({
    userOwnerId: String,
});

module.exports = model('Owner', OwnerSchema);

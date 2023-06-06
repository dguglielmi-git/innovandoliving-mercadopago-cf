const { Schema, model } = require("mongoose");

const AuditSchema = new Schema({
    collectionName: String,
    field: String,
    previousValue: String,
    newValue: String,
    updateTimeStamp: {
        type: Date,
        default: Date.now,
    },
    actionPerformedByUser: Schema.Types.ObjectId,
});

module.exports = model('Audit', AuditSchema);
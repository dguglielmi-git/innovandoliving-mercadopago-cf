const { Schema, model } = require('mongoose');

const OrderStatusSchema = new Schema({
    status: Number,
    description: String,
});

module.exports = model('Order_Status', OrderStatusSchema);
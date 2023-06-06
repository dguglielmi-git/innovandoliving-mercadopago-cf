const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
    addressDelivery: {},
    addressInvoice: {},
    addressTransport: {},
    costDelivery: Schema.Types.Decimal128,
    dateCreated: { type: Date, default: Date.now },
    dateClosed: { type: Date },
    deliveryOption: String,
    orderCollectorId: String,
    OrderPreferenceId: String,
    items: [{}],
    messages: [{
        username: String,
        icon: String,
        messageDate: {
            type: Date,
            default: Date.now,
        },
        message: String,
        msgread: Number,
        msgreadowner: Number,
    }],
    paymentMethodSelected: String,
    purchaseTotalReceived: {
        type: Schema.Types.Decimal128,
        default: 99999999999.99,
    },
    purchaseTotalPendingPayment: {
        type: Schema.Types.Decimal128,
        default: 99999999999.99,
    },
    purchaseTotalAmount: Schema.Types.Decimal128,
    cashPending: Schema.Types.Decimal128,
    cashReceived: Schema.Types.Decimal128,
    creditPending: Schema.Types.Decimal128,
    creditReceived: Schema.Types.Decimal128,
    status: Number,
    status_history: [{
        status: Number,
        createAt: {
            type: Date,
            default: Date.now,
        },
        modifiedBy: Schema.Types.ObjectId,
    }],
    userId: String,
    paymentId: String,
    mercadoPagoStatus: String,
    mercadoPagoPaymentId: String,
    mercadoPagoPaymentType: String,
    mercadoPagoMerchantOrderId: String,
    mercadoPagoProcessingMode: String,
});

module.exports = model('Order', OrderSchema);

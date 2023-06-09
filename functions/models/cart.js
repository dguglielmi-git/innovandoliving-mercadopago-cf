const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'Producto'
  },
  users_permissions_user: Schema.Types.ObjectId,
  quantity: Number,
});

module.exports = model("Cart", CartSchema);